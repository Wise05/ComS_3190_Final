import React from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.Username.value;
    const email = e.target.Email.value;
    const age = e.target.Age.value;
    const password = e.target.Password.value;
    const confirmPassword = e.target.ConfirmPassword.value;

    if (password !== confirmPassword) {
      window.alert("Passwords do not match!");
      return;
    }

    const userData = {
      username,
      email,
      age,
      password,
    };

    try {
      const res = await fetch("http://localhost:8080/personalProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        window.alert("Account created successfully!");
        navigate("/"); // Redirect to home
      } else {
        const msg = await res.text();
        window.alert(`Failed to create account: ${msg}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
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
            required
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
            required
          />
        </div>

        <div className='flex items-center gap-2 text-left'>
          <input type='checkbox' name='terms' id='terms' required />
          <label htmlFor='terms'>
            I agree to{" "}
            <a href='/terms_and_conditions' className='text-blue-600 underline'>
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
