import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    category: "",
    cause: "",
    maxAttendees: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/events", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Event created successfully");
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        category: "",
        cause: "",
        maxAttendees: "",
      });
      navigate("/events"); // Redirect to events page after creation
    } catch (err) {
      toast.error("Error creating event");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#172521] mb-6">Create Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
            <input
              type="text"
              placeholder="Cause"
              value={formData.cause}
              onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
              className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              required
            />
            <input
              type="number"
              placeholder="Max Attendees (optional)"
              value={formData.maxAttendees}
              onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
              className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
            />
            <button
              type="submit"
              className="w-full bg-[#3AAFA9] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEventForm;