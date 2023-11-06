'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Navbar() {

  const pathname = usePathname()
  const router = useRouter();

  const logout = async () => {
    console.log('button logout pressed')
    const response = await fetch('http://localhost:4000/api/user/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4000' 
      },
      credentials: "include"
    });

    console.log('point B')

    const json = await response.json();

    console.log(json)

    if (!response.ok) {
      toast.error(json.error);
    }

    if (response.ok) {
      toast.success('Logged out!');
      router.push('/auth/login');
    }
  }

  return (
    <div className='bg-white border-b'>
      <div className='container mx-auto h-24 flex items-center px-6 md:px-12 justify-between'>
        <h1 className='text-2xl font-bold md:pr-16 text-center'>Workout Buddy</h1>
        
        {(pathname === '/auth/login' || pathname === '/auth/signup') && (
          <div className='flex gap-x-6'>
            <Link 
              href={'/auth/login'}
              className='rounded-lg bg-green-500 hover:bg-green-600 text-white px-6 md:px-10 py-2 font-medium text-sm'
            >
              Login
            </Link>

            <Link 
              href={'/auth/signup'}
              className='rounded-lg bg-green-500 hover:bg-green-600 text-white px-6 md:px-10 py-2 font-medium text-sm'
            >
              Signup
            </Link>
          </div>
        )}

        {pathname === '/' && (
          <div className='flex gap-x-6'>
            <button 
              onClick={logout}
              className='rounded-lg bg-green-500 hover:bg-green-600 text-white px-6 md:px-10 py-2 font-medium text-sm'
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar