import React, { useState, useEffect } from "react";

function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    age: "",
    email: "",
    likedSongs: 0,
    productsInCart: 0,
  });
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Fetch user profile data from the backend endpoint
    const userEmail = localStorage.getItem("userEmail"); // Assuming email is stored after login/signup
    if (!userEmail) {
      setError("No user email found. Please log in or sign up.");
      return;
    }

    fetch(
      `http://localhost:8080/personalProfile?email=${encodeURIComponent(
        userEmail
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Email is required.");
          } else if (response.status === 404) {
            throw new Error("User not found.");
          }
          throw new Error("Failed to fetch profile data.");
        }
        return response.json();
      })
      .then((data) => {
        setUserData((prev) => ({
          ...prev,
          username: data.username || "",
          email: data.email || "",
          age: data.age || "",
          likedSongs: data.likedSongs || 0, // Assuming backend may include these fields
          productsInCart: data.productsInCart || 0,
        }));
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setError(error.message);
      });
  }, []);

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setError("No user email found. Please log in or sign up.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/personalProfile/${encodeURIComponent(
          userEmail
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found.");
        }
        throw new Error("Failed to delete user.");
      }

      // Clear localStorage and reset user data
      localStorage.removeItem("userEmail");
      setUserData({
        username: "",
        age: "",
        email: "",
        likedSongs: 0,
        productsInCart: 0,
      });
      setError("Account deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setError("No user email found. Please log in or sign up.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password.");
      }

      setError("Password changed successfully.");
      setShowChangePassword(false); // Hide password change form after successful update
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='p-6 bg-white rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center mb-4'>Profile</h2>

        {error && (
          <div className='my-4 p-4 bg-red-100 text-red-700 rounded'>
            {error}
          </div>
        )}

        {/* User Information Section */}
        <div className='my-4'>
          <h3 className='text-xl font-medium'>User Information</h3>
          <p>
            <strong>Username:</strong> {userData.username || "Loading..."}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || "Loading..."}
          </p>
          <p>
            <strong>Age:</strong> {userData.age || "Loading..."}
          </p>
        </div>

        {/* Liked Songs Section */}
        <div className='my-6'>
          <h3 className='text-xl font-medium'>Liked Songs</h3>
          <p>{userData.likedSongs}</p>
        </div>

        {/* Products in Cart Section */}
        <div className='my-6'>
          <h3 className='text-xl font-medium'>Products in Cart</h3>
          <p>{userData.productsInCart}</p>
        </div>

        {/* Show Change Password Form if no error and data is retrieved */}
        {userData.username && !error && !showChangePassword && (
          <div className='my-6'>
            <button
              className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
              onClick={() => setShowChangePassword(true)}>
              Change Password
            </button>
          </div>
        )}

        {/* Change Password Form */}
        {showChangePassword && !error && (
          <div className='my-6'>
            <div className='mb-4'>
              <input
                type='password'
                placeholder='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full p-2 border rounded mb-2'
              />
            </div>
            <div className='mb-4'>
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full p-2 border rounded mb-2'
              />
            </div>
            <button
              className='w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
              onClick={handleChangePassword}>
              Update Password
            </button>
          </div>
        )}

        {/* Delete Account Button */}
        {userData.username && !error && (
          <div className='my-6'>
            <button
              className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
              onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
