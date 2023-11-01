import useWorkoutStore from '@/stores/workoutStore';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddWorkoutForm() {

  const addWorkout = useWorkoutStore(state => state.addWorkout);

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [emptyFields, setEmptyFields] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {title, load, reps};

    const response = await fetch('http://localhost:4000/api/workouts/', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json()

    if (!response.ok) {
      toast.error(json.error);
      setEmptyFields(json.emptyFields);
      console.error(json);
    }

    if (response.ok) {

      toast.success('Workout added!');

      // Reset all 
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyFields(null);

      // Add workout to state
      addWorkout(json.workout);
      console.log('new workout added:', json)
    }

  }

  return (
    <form 
      className='my-8 lg:mt-0 w-full' 
      onSubmit={handleSubmit}
    >

      <h1 className='text-xl font-bold pb-6'>Add a New Workout</h1>

      <div className='flex flex-col gap-y-6 text-sm'>
        <label>
          <p>Workout title:</p>
          <input
            className={`mt-2 h-10 rounded-md border w-full pl-2 ${emptyFields && emptyFields.includes('title') && 'border-red-500'}`}
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <p>Load (in kg):</p>
          <input
            className={`mt-2 h-10 rounded-md border w-full pl-2 ${emptyFields && emptyFields.includes('load') && 'border-red-500'}`}
            type='text'
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        </label>

        <label>
          <p>Reps:</p>
          <input
            className={`mt-2 h-10 rounded-md border w-full pl-2 ${emptyFields && emptyFields.includes('reps') && 'border-red-500'}`}
            type='text'
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </label>
      </div>

      <button 
        className='bg-green-500 text-white px-2 py-2 rounded-md text-sm mt-6'
        type='submit'
      >
        Add Workout
      </button>

    </form>
  )
}

export default AddWorkoutForm