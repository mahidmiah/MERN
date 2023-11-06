'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

function Page() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/user/login/', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4000' 
      },
      credentials: "include"
    });

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }

    if (response.ok) {
      // save the user to local storage 
      toast.success('Logged in!');
      router.push('/');
      // localStorage.setItem('user', JSON.stringify(json));
    }

  }

  return (
    <div className='flex justify-center'>
      <div className='py-32'>
        <form
          className='bg-white rounded-lg shadow-sm border pb-10 pt-10 px-8 flex flex-col'
          onSubmit={handleSubmit}
        >
          <h1 className='mb-6 text-xl font-bold'>Login</h1>

          <label>
            <p>Email:</p>
            <input 
              type='text'
              className='mt-2 h-10 rounded-md border pl-2'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <p className='mt-4'>Password:</p>
            <input 
              type='password'
              className='mt-2 h-10 rounded-md border pl-2'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button 
            className='bg-green-500 text-white px-2 py-2 rounded-md text-sm mt-6'
            type='submit'
          >
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default Page