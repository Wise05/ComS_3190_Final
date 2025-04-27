import React from "react";

function Login() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        action='/Home'
        className='flex flex-col gap-4 p-8 border rounded-lg shadow-lg'>
        <h3 className='text-2xl font-semibold text-center'>Login</h3>

        <div className='flex flex-col'>
          <label htmlFor='Username'>Enter your Username</label>
          <input
            type='text'
            name='Username'
            id='Username'
            placeholder='Username'
            className='border p-2 rounded'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='Password'>Enter your Password</label>
          <input
            type='password'
            name='Password'
            id='Password'
            placeholder='Password'
            className='border p-2 rounded'
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
          Verify
        </button>

        <a
          href='./SignIn'
          className='bg-gray-500 text-white py-2 rounded text-center hover:bg-gray-600'>
          SignIn
        </a>
      </form>
    </div>
  );
}

export default Login;
