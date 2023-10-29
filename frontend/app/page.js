'use client'

import WorkoutDetail from '@/components/WorkoutDetail';
import { useEffect, useState } from 'react'

export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts/');
      const { workouts } = await response.json();
      if (response.ok) {
        setData(workouts);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <main className="container mx-auto px-12 py-12">
      <div className='flex flex-col gap-y-4'>
        {
          data && data.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))
        }
      </div>
    </main>
  )
}
