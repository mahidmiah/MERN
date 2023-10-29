import React from 'react'

function WorkoutDetail({ workout }) {

  const {title, load, reps, createdAt} = workout;

  return (
    <div className='max-w-4xl h-fit rounded-md border bg-white p-4 shadow-md'>
      <h1 className='text-xl text-green-600 font-bold'>{title}</h1>

      <div className='pt-3 text-gray-700 font-thin flex flex-col gap-y-1'>
        <p><span className='font-semibold'>Load (kg): </span>{load}</p>
        <p><span className='font-semibold'>Reps: </span>{reps}</p>
        <p>{createdAt}</p>
      </div>
    </div>
  )
}

export default WorkoutDetail