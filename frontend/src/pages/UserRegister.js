import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const UserRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.firstName || form.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    if (!form.lastName || form.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.password || form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:2845/api/user/register", {
          FirstName: form.firstName,
          LastName: form.lastName,
          email: form.email,
          password: form.password,
        });

        toast.success(response.data?.message || "Registered successfully!");

        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setErrors({});

        setTimeout(() => {
          navigate("/verify-email", { state: { email: form.email } });
        }, 1500);

      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Registration failed");
      }
    } else {
      setErrors(validationErrors);
      toast.error("Please fix the form errors before submitting.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eeebff] px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create a Customer Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your information to register as a customer
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-400"
                }`}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-purple-400"
                }`}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-400"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-purple-400"
              }`}
              placeholder="********"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account{" "}
          <Link to="#" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          <Link to="/admin/register" className="hover:underline">
            Register as an Admin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
