import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/teams/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeam(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          toast.error("Team not found");
        } else if (err.response?.status === 403) {
          toast.error("You do not have access to this team");
        } else {
          toast.error("Error fetching team details");
        }
        console.error(err);
      }
    };

    fetchTeamDetails();
  }, [id]);

  const handleInvite = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/teams/${id}/invite`,
        { email: inviteEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Invitation sent successfully");
      setInviteEmail(""); // Clear the input
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("User not found");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error sending invitation");
      }
      console.error(err);
    }
  };

  if (!team) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
        <Navbar />
        <div className="flex-grow container mx-auto p-6 text-center">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-[#172521] mb-4">{team.name}</h2>
          <p className="text-[#2B7A78] mb-4">{team.description}</p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-[#3AAFA9]">
              <span className="font-semibold">Leader:</span> {team.leader.name}
            </p>
            <p className="text-sm text-[#3AAFA9]">
              <span className="font-semibold">Members:</span> {team.members.length}
            </p>
            <p className="text-sm text-[#3AAFA9]">
              <span className="font-semibold">Type:</span> {team.isPublic ? "Public" : "Private"}
            </p>
          </div>

          {/* Invite Section for Private Teams */}
          {!team.isPublic && team.leader.id === parseInt(localStorage.getItem("userId") || 0) && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-[#172521] mb-4">Invite Members</h3>
              <input
                type="email"
                placeholder="Enter email to invite"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              />
              <button
                onClick={handleInvite}
                className="mt-2 bg-[#3AAFA9] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
              >
                Send Invitation
              </button>
            </div>
          )}

          {/* Team Members */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-[#172521] mb-4">Team Members</h3>
            <ul>
              {team.members.map((member) => (
                <li
                  key={member.id}
                  className="bg-[#DEF2F1] p-4 rounded-lg mb-2"
                >
                  {member.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Team Events */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-[#172521] mb-4">Team Events</h3>
            {team.events.map((event) => (
              <div
                key={event.id}
                className="bg-[#DEF2F1] p-4 rounded-lg mb-2"
              >
                <p className="text-[#2B7A78]">{event.title}</p>
                <p className="text-sm text-[#3AAFA9]">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
              </div>
            ))}
          </div>

          {/* Back to Teams */}
          <div className="mt-6">
            <Link
              to="/teams"
              className="bg-[#3AAFA9] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
            >
              Back to Teams
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamDetails;