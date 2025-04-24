import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateHelpRequestForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    cause: "",
    urgency: "low",
  });

  // 🔹 Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to create a help request!");
      navigate("/login"); // Redirect to Login Page
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to submit a help request!");
        return;
      }

      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Help request created successfully!");
      navigate("/posts"); // Redirect to posts page after submission
    } catch (err) {
      toast.error("Error creating help request");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#DEF2F1]">
      <Navbar />

      {/* Hero/Banner Section */}
      <div className="bg-[#3AAFA9] py-20 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-[#FEFFFF] mb-4">Request Help</h1>
          <p className="text-xl text-[#FEFFFF]">Submit your help request and get support!</p>
        </div>
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-24 h-24 bg-[#2B7A78] rounded-full top-10 left-10 opacity-20"></div>
          <div className="absolute w-32 h-32 bg-[#2B7A78] rounded-full bottom-20 right-20 opacity-20"></div>
          <div className="absolute w-16 h-16 bg-[#2B7A78] rounded-full top-1/2 left-1/2 opacity-20"></div>
        </div>
      </div>

      {/* Form Section */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Help Request</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Cause"
              value={formData.cause}
              onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="urgent">Urgent</option>
            </select>
            <button
              type="submit"
              className="w-full bg-[#3AAFA9] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
            >
              Create Help Request
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateHelpRequestForm;
