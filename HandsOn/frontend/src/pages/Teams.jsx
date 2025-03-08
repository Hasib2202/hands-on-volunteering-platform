import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to view teams");
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    const fetchTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teams", {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in the headers
        });
        setTeams(res.data);
      } catch (err) {
        toast.error("Error fetching teams");
        console.error(err);
      }
    };

    fetchTeams();
  }, [navigate]);

  const handleCreateTeamClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a team");
      navigate("/login"); // Redirect to login page
    } else {
      navigate("/create-team"); // Redirect to create team page
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB] relative overflow-hidden">
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

      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#172521]">Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-[#172521] mb-4">
                {team.name}
              </h3>
              <p className="text-[#2B7A78] mb-4">{team.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-[#3AAFA9]">
                  <span className="font-semibold">Leader:</span> {team.leader.name}
                </p>
                <p className="text-sm text-[#3AAFA9]">
                  <span className="font-semibold">Members:</span> {team.members.length}
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to={`/teams/${team.id}`}
                  className="text-[#3AAFA9] hover:text-[#2B7A78] font-semibold"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Create Team Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCreateTeamClick}
            className="bg-[#3AAFA9] text-white px-6 py-3 rounded-lg hover:bg-[#2B7A78] transition-colors"
          >
            Create Team
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Teams;