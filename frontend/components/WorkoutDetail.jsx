import useWorkoutStore from '@/stores/workoutStore';
import React from 'react'
import { toast } from 'sonner';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function WorkoutDetail({ workout }) {

  const deleteWorkout = useWorkoutStore(state => state.deleteWorkout);

  const {title, load, reps, createdAt} = workout;

  const handleDelete = async () => {
    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'DELETE',
    });

    const json = await response.json()

    if (!response.ok) {
      toast.error(json.Error);
    }

    if (response.ok) {

      toast.success('Workout deleted!');

      // Remove workout from store
      deleteWorkout(workout._id);
      console.log('workout deleted:', json)
    }
  }

  return (
    <div className='h-fit rounded-md border bg-white p-4 shadow-md relative'>
      <h1 className='text-xl text-green-600 font-bold'>{title}</h1>

      <div className='pt-3 text-gray-700 font-thin flex flex-col gap-y-1'>
        <p><span className='font-semibold'>Load (kg): </span>{load}</p>
        <p><span className='font-semibold'>Reps: </span>{reps}</p>
        <p>{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
      </div>

      <button 
        className='absolute top-4 right-4 text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md font-medium'
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}

export default WorkoutDetail