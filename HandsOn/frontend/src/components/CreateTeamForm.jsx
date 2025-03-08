import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateTeamForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/teams", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Team created successfully!");
      navigate("/teams"); // Redirect to the teams page
    } catch (err) {
      toast.error("Error creating team");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#172521]">
            Create Team
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Team Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="mr-2"
              />
              Public Team
            </label>
            <button
              type="submit"
              className="w-full bg-[#3AAFA9] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
            >
              Create Team
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateTeamForm;