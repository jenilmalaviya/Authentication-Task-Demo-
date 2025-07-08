import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
export default function AdminRegisterForm() {
  const apiUrl = process.env.BACKEND_URL;

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
    if (form.firstName.length < 2)
      newErrors.firstName = "First name must be at least 2 characters";
    if (form.lastName.length < 2)
      newErrors.lastName = "Last name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${apiUrl}api/admin/register`, {
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
        toast.error(error.response?.data?.message || "Registration failed");
      }
    } else {
      setErrors(validationErrors);
      toast.error("Please fix the form errors before submitting.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f3ff] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create an Admin Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your information to register as an administrator
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                type="text"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                type="text"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
              type="password"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>

        <div className="text-center mt-2 text-sm text-gray-600">
          Not an admin?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register as a User
          </Link>
        </div>
      </div>
    </div>
  );
}
