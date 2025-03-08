import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Notifications = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/teams/invitations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvitations(res.data);
      } catch (err) {
        toast.error("Error fetching invitations");
        console.error(err);
      }
    };

    fetchInvitations();
  }, []);

  const handleRespond = async (invitationId, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/teams/invitations/${invitationId}/respond`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      setInvitations((prev) =>
        prev.map((inv) => (inv.id === invitationId ? { ...inv, status } : inv))
      );
    } catch (err) {
      toast.error("Error responding to invitation");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#172521]">Notifications</h2>
        <div className="space-y-4">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-[#172521]">
                Invitation to join{" "}
                <span className="text-[#3AAFA9]">{invitation.team.name}</span>
              </h3>
              <p className="text-sm text-[#2B7A78] mt-2">
                Sent by: {invitation.team.leader.name}
              </p>
              <div className="mt-4 flex space-x-4">
                {invitation.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleRespond(invitation.id, "accepted")}
                      className="bg-[#3AAFA9] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRespond(invitation.id, "rejected")}
                      className="bg-[#172521] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                {invitation.status === "accepted" && (
                  <span className="text-[#3AAFA9] font-semibold">Accepted</span>
                )}
                {invitation.status === "rejected" && (
                  <span className="text-[#172521] font-semibold">Rejected</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;