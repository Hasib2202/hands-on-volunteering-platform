import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PendingLogs = () => {
  const [pendingLogs, setPendingLogs] = useState([]);

  // Fetch pending logs
  useEffect(() => {
    const fetchPendingLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/volunteer/pending-logs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingLogs(res.data);
      } catch (err) {
        toast.error("Error fetching pending logs");
        console.error(err);
      }
    };

    fetchPendingLogs();
  }, []);

  // Handle verification
  const handleVerify = async (logId, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/volunteer/verify-hours/${logId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      // Remove the verified log from the list
      setPendingLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
    } catch (err) {
      toast.error("Error verifying log");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#172521]">Pending Volunteer Logs</h2>
        <div className="space-y-4">
          {pendingLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-[#2B7A78]"><strong>User:</strong> {log.user.name}</p>
              <p className="text-[#2B7A78]"><strong>Event:</strong> {log.event.title}</p>
              <p className="text-[#2B7A78]"><strong>Hours:</strong> {log.hours}</p>
              <p className="text-[#2B7A78]"><strong>Description:</strong> {log.description}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleVerify(log.id, "verified")}
                  className="bg-[#3AAFA9] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleVerify(log.id, "rejected")}
                  className="bg-[#172521] text-white px-4 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PendingLogs;