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
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("No user email found. Please log in.");
      return;
    }

    fetch(`http://localhost:8080/personalProfile/${encodeURIComponent(email)}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found.");
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const email = localStorage.getItem("userEmail");
    try {
      const res = await fetch("http://localhost:8080/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!res.ok) throw new Error("Failed to change password.");
      setError("Password changed successfully.");
      setShowChangePassword(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    const email = localStorage.getItem("userEmail");
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/personalProfile/${encodeURIComponent(email)}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete account.");
      localStorage.removeItem("userEmail");
      setError("Account deleted.");
      setUserData({});
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>
        )}

        <p>
          <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Age:</strong> {userData.age}
        </p>

        <div className="mt-4">
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
        </div>

        {showChangePassword && (
          <div className="mt-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleChangePassword}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Update Password
            </button>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
