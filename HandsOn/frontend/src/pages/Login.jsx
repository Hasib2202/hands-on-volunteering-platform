import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token); // Store the token
      localStorage.setItem("userId", res.data.user.id); // Store the user ID
      toast.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB] relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center relative">
        {/* SVG Background */}
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 1440 600"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M0 96l48-10.7C96 75 192 53 288 69.3 384 85 480 139 576 160s192 5 288-16 192-75 288-74.7c96 .3 192 74.3 288 96s192-5 288-26.7c96-21.3 192-53.3 240-69.3l48-16V600H0z"
              fill="#3AAFA9"
              fillOpacity="0.2"
            />
            <path
              d="M0 192l48-16c48-16 144-48 240-37.3 96 10.7 192 74.7 288 96s192 5 288-16 192-75 288-74.7c96 .3 192 74.3 288 96s192-5 288-26.7c96-21.3 192-53.3 240-69.3l48-16V600H0z"
              fill="#2B7A78"
              fillOpacity="0.2"
            />
          </svg>
        </div>

        <Toaster />
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded-xl shadow-2xl w-96 relative z-10"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-[#172521]">Login</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#2B7A78]">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-[#2B7A78]">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-[#3AAFA9] rounded-lg hover:bg-[#2B7A78] transition-colors"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center text-[#2B7A78]">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#3AAFA9] cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;