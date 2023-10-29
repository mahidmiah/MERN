import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='bg-white border-b'>
      <div className='container mx-auto h-24 flex items-center px-6 md:px-12 justify-between'>
        <h1 className='text-3xl font-bold md:pr-16 text-center'>Workout Buddy</h1>
        
        <div className='flex gap-x-6 md:gap-x-10'>
          <Link 
            href={'#'}
            className='rounded-lg bg-green-500 text-white px-6 md:px-16 py-2 font-medium text-sm'
          >
            Test
          </Link>

          <Link 
            href={'#'}
            className='rounded-lg bg-green-500 text-white px-6 md:px-16 py-2 font-medium text-sm'
          >
            Test
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Navbar