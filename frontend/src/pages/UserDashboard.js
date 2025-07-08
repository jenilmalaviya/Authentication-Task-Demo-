import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.BACKEND_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/user-details`, {
          withCredentials: true,
        });

        const userData = response.data.user;

        setUser({
          name: `${userData.FirstName} ${userData.LastName}`,
          email: userData.email,
          role: userData.role,
          status: userData.isVerified ? "Verified" : "Not Verified",
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("${apiUrl}api/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center px-8 py-4 border-b shadow-sm bg-white">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button
          className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="p-8 flex flex-col md:flex-row gap-6 justify-center items-start">
        {user ? (
          <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Welcome, {user.name}!
            </h2>
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                <strong>Account Details</strong>
              </p>
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Role:</span> {user.role}
              </p>
              <p>
                <span className="font-medium">Status:</span> {user.status}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
