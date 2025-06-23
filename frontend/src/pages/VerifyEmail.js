import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner';

const VerifyEmail = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email); 
    }
  }, [location.state]);

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    try {
      const data = {
        email: email,
        otp: parseInt(code)
      };

      const response = await axios.post("http://localhost:2845/api/verify-email", data);

      toast.success(response.data?.message);

      const { user } = response.data; 
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      Navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Verification failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f0fc]">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Verify Your Email</h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the verification code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Verification Code</label>
            <input
              type="text"  
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-200"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
