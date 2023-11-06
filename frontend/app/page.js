'use client'

import AddWorkoutForm from '@/components/AddWorkoutForm';
import WorkoutDetail from '@/components/WorkoutDetail';
import useWorkoutStore from '@/stores/workoutStore';
import { useEffect, useState } from 'react'

export default function Home() {

  const getSortedWorkouts = useWorkoutStore(state => state.getSortedWorkouts);
  const storedWorkouts = useWorkoutStore(state => state.workouts);
  const addWorkout = useWorkoutStore(state => state.addWorkout);

  useEffect(() => {
    const fetchWorkouts = async () => {

      const response = await fetch('http://localhost:4000/api/workouts/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4000' 
        },
        credentials: "include"
      });
      const { workouts } = await response.json();
      if (response.ok) {
        workouts.map(workout => {
          addWorkout(workout)
        })
      }
    }
  
    fetchWorkouts();
  }, []);
  
  useEffect(() => {
    console.warn('[Debug Store]:', storedWorkouts);
  }, [storedWorkouts]); // Add storedWorkouts as a dependency

  return (
    <main className="container mx-auto px-12 pb-8 lg:py-12">

      <div className='flex flex-col-reverse lg:flex-row gap-x-12'>

        <div className='flex flex-col gap-y-4 lg:w-2/3'>
          {
            Object.values(storedWorkouts).length > 0 ? Object.values(getSortedWorkouts()).map((workout) => (
              <WorkoutDetail key={workout._id} workout={workout} />
            ))
            :
            <p>No Data</p>
          }
        </div>

        <div className='lg:w-1/3'>
          <AddWorkoutForm />
        </div>

      </div>
    </main>
  )
}
