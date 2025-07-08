import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const apiUrl = process.env.BACKEND_URL;
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/admin-details`, {
          withCredentials: true, // ensures cookies are sent
        });
        setAdmin(response.data.admin);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center px-8 py-4 border-b shadow-sm bg-white">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition">
          Logout
        </button>
      </div>

      <div className="p-8 flex flex-col md:flex-row gap-6 justify-center items-start">
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            Welcome,{" "}
            {admin ? `${admin.FirstName} ${admin.LastName}` : "Loading..."}
          </h2>
          {admin ? (
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                <strong>Account Details</strong>
              </p>
              <p>
                <span className="font-medium">Name:</span> {admin.FirstName}{" "}
                {admin.LastName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {admin.email}
              </p>
              <p>
                <span className="font-medium">Role:</span> {admin.role}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {admin.isVerified ? "Verified" : "Not Verified"}
              </p>
            </div>
          ) : (
            <p>Loading admin details...</p>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Admin Actions</h2>
          <p className="text-sm text-gray-600 mb-4">
            This is where your admin-specific features would be placed. You can
            manage users, content, settings, etc.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
