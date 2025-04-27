import React from "react";

function SignIn() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        action='/Home'
        className='flex flex-col gap-4 p-8 border rounded-lg shadow-lg text-center'>
        <h3 className='text-2xl font-semibold'>Sign In</h3>

        <div className='flex flex-col text-left'>
          <label htmlFor='Username'>Enter Username</label>
          <input
            type='text'
            name='Username'
            id='Username'
            placeholder='Username'
            minLength={8}
            maxLength={20}
            required
            className='border p-2 rounded'
          />
        </div>

        <div className='flex flex-col text-left'>
          <label htmlFor='Email'>Enter your Email</label>
          <input
            type='email'
            name='Email'
            id='Email'
            placeholder='Email Id'
            required
            className='border p-2 rounded'
          />
        </div>

        <div className='flex flex-col text-left'>
          <label htmlFor='Age'>Enter Age</label>
          <input
            type='number'
            name='Age'
            id='Age'
            placeholder='Age'
            className='border p-2 rounded'
          />
        </div>

        <div className='flex flex-col text-left'>
          <label htmlFor='Password'>Enter Password</label>
          <input
            type='password'
            name='Password'
            id='Password'
            placeholder='Password'
            className='border p-2 rounded'
          />
        </div>

        <div className='flex flex-col text-left'>
          <label htmlFor='ConfirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='ConfirmPassword'
            id='ConfirmPassword'
            placeholder='Confirm Password'
            className='border p-2 rounded'
          />
        </div>

        <div className='flex items-center gap-2 text-left'>
          <input type='checkbox' name='terms' id='terms' required />
          <label htmlFor='terms'>
            I agree to{" "}
            <a href='terms_and_conditions' className='text-blue-600 underline'>
              terms and conditions
            </a>
          </label>
        </div>

        <button
          type='submit'
          className='bg-green-500 text-white py-2 rounded hover:bg-green-700 active:bg-green-800'>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignIn;
