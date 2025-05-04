import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");

  // Fetch user profile data from the backend
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage

        const response = await fetch("/personalProfile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Set user profile data
          setLikedSongs(data.likedSongs || []); // Set liked songs if available
          setProductsInCart(data.productsInCart || []); // Set products in cart if available
          setLoading(false);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error fetching user data.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle the change password form submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate new passwords
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage

      const response = await fetch("/personalProfile/changePassword", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setPasswordChangeSuccess("Password updated successfully.");
        setPasswordChangeError("");
      } else {
        const errorData = await response.json();
        setPasswordChangeError(errorData.message || "Error updating password.");
        setPasswordChangeSuccess("");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordChangeError("Error updating password.");
    }
  };

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-semibold'>Profile</h2>

      {/* User Information Section */}
      <div className='my-4'>
        <h3 className='text-xl font-medium'>User Information</h3>
        <p>
          <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </div>

      {/* Liked Songs Section */}
      <div className='my-6'>
        <h3 className='text-xl font-medium'>Liked Songs</h3>
        <ul>
          {likedSongs.length > 0 ? (
            likedSongs.map((song, index) => <li key={index}>{song}</li>)
          ) : (
            <li>No liked songs available</li>
          )}
        </ul>
      </div>

      {/* Products in Cart Section */}
      <div className='my-6'>
        <h3 className='text-xl font-medium'>Products in Cart</h3>
        <ul>
          {productsInCart.length > 0 ? (
            productsInCart.map((product, index) => (
              <li key={index}>{product}</li>
            ))
          ) : (
            <li>No products in cart</li>
          )}
        </ul>
      </div>

      {/* Change Password Section */}
      <div className='my-6'>
        <h3 className='text-xl font-medium'>Change Password</h3>

        <button
          className='bg-blue-500 text-white py-2 px-4 rounded mb-4'
          onClick={() => setChangePassword(!changePassword)}>
          {changePassword ? "Cancel" : "Change Password"}
        </button>

        {changePassword && (
          <form onSubmit={handlePasswordChange} className='space-y-4'>
            <div>
              <label htmlFor='currentPassword' className='block'>
                Current Password
              </label>
              <input
                type='password'
                id='currentPassword'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='border p-2 rounded w-full'
                required
              />
            </div>

            <div>
              <label htmlFor='newPassword' className='block'>
                New Password
              </label>
              <input
                type='password'
                id='newPassword'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='border p-2 rounded w-full'
                required
              />
            </div>

            <div>
              <label htmlFor='confirmNewPassword' className='block'>
                Confirm New Password
              </label>
              <input
                type='password'
                id='confirmNewPassword'
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className='border p-2 rounded w-full'
                required
              />
            </div>

            {passwordChangeError && (
              <div className='text-red-500'>{passwordChangeError}</div>
            )}

            {passwordChangeSuccess && (
              <div className='text-green-500'>{passwordChangeSuccess}</div>
            )}

            <button
              type='submit'
              className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700'>
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
