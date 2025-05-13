// Koushik and Zevan
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const navigate = useNavigate();
  const { setIsSignedIn } = useOutletContext();

  // get user info on first render
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
      const res = await fetch(
        "http://localhost:8080/personalProfile/changePassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, currentPassword, newPassword }),
        }
      );

      const message = await res.text();
      if (!res.ok) throw new Error(message);

      setError("Password changed successfully.");
      setShowChangePassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
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

  // Fetch Orders
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/orders?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        console.log("loading");
      }
    };

    fetchOrders();
  }, []);

  // delete orders
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Deleted order:", orderId);
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
        alert("Successfully deleted order");
      } else {
        console.error("Failed to delete order:", data.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Fetch Liked Songs
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    const fetchLikedSongs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/artist/${email}`);
        if (response.ok) {
          const textData = await response.text();
          console.log("Response Text:", textData);

          try {
            const data = JSON.parse(textData);
            console.log("Parsed Data:", JSON.stringify(data, null, 2));

            if (data && data.likedSongs) {
              setLikedSongs(data.likedSongs);
            } else {
              setLikedSongs([]);
            }
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError, textData);
            setLikedSongs([]);
          }
        } else if (response.status === 404) {
          setLikedSongs([]);
          await fetch("http://localhost:8080/artist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
        } else {
          console.error("Error fetching liked songs:", response.status);
        }
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    fetchLikedSongs();
  }, []);

  const logOut = () => {
    localStorage.removeItem("userEmail");
    setUserData({});
    setIsSignedIn(false);
    navigate("/");
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
        {/* Password change */}
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
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
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

        {/* Delete account */}
        <div className="mt-4">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Account
          </button>
        </div>
        <div>
          <div className="mt-4">
            <button
              onClick={() => {
                logOut();
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Log Out
            </button>
          </div>
          <div></div>
          <h2>Liked Songs</h2>

          {likedSongs.length > 0 ? (
            <div className="flex overflow-x-auto gap-2">
              {likedSongs.map((song) => {
                return (
                  <a
                    href={song.strMusicVid}
                    key={song.idTrack}
                    className="border rounded-lg p-3 min-w-30 hover hover:scale-95 transition"
                  >
                    <p>Title: {song.title}</p>
                    <p>Artist: {song.artist}</p>
                  </a>
                );
              })}
            </div>
          ) : (
            <p>You have not liked any songs</p>
          )}
        </div>
        <div>
          <h2>Orders</h2>
          <div className="className= flex overflow-x-auto gap-2">
            {orders.length > 0 ? (
              <div className="border rounded-lg p-3">
                {orders.map((order, orderIndex) => (
                  <div key={order._id}>
                    {" "}
                    {/* Use _id as the key for stability */}
                    <h4>Order #{orderIndex + 1}</h4>
                    {order.items.map((item, itemIndex) => (
                      <p key={itemIndex}>{item.title}</p>
                    ))}
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                    >
                      Delete Order
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't made any orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
