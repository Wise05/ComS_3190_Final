import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Verify button clicked, submitting form with:", {
      email,
      password,
    });

    if (!email || !password) {
      setErrorMsg("Email and password are required.");
      console.log("Validation failed: Email or password missing");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.text(); // Expect text response
      console.log("Backend response:", data, "Status:", res.status);

      if (res.ok) {
        // Store email in localStorage for Profile.jsx
        localStorage.setItem("userEmail", email);
        setErrorMsg("");
        console.log("Login successful, redirecting to /profile");
        navigate("/");
      } else {
        // Handle backend error messages
        if (res.status === 401) {
          setErrorMsg(data); // "User not found." or "Invalid password."
        } else if (res.status === 400) {
          setErrorMsg("Email and password are required.");
        } else {
          setErrorMsg(data || "Login failed.");
        }
        console.log("Login failed with error:", data);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMsg(
        "Failed to connect to the server. Please ensure the backend server is running on http://localhost:8080 and MongoDB is active."
      );
    }
  };

  const handleSignIn = () => {
    console.log("Sign In button clicked, navigating to /signin");
    navigate("/signin");
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 p-8 border rounded-lg shadow-lg'>
        <h3 className='text-2xl font-semibold text-center'>Login</h3>

        <div className='flex flex-col'>
          <label htmlFor='Email'>Enter your Email</label>
          <input
            type='email'
            name='Email'
            id='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='border p-2 rounded'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='Password'>Enter your Password</label>
          <input
            type='password'
            name='Password'
            id='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='border p-2 rounded'
          />
        </div>

        {errorMsg && (
          <div className='text-red-500 text-sm text-center'>{errorMsg}</div>
        )}

        <button
          type='submit'
          className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
          onClick={() => console.log("Verify button clicked")}>
          Login
        </button>

        <button
          type='button'
          onClick={handleSignIn}
          className='bg-gray-500 text-white py-2 rounded hover:bg-gray-600'>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
