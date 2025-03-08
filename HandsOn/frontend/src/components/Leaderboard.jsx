import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/volunteer/leaderboard");
        setLeaderboard(res.data);
      } catch (err) {
        toast.error("Error fetching leaderboard");
        console.error(err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#DEF2F1]">
      <Navbar />
      <Toaster />

      {/* Hero/Banner Section */}
      <div className="bg-[#3AAFA9] py-20 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-[#FEFFFF] mb-4">Leaderboard</h1>
          <p className="text-xl text-[#FEFFFF]">See how you rank among other volunteers!</p>
        </div>
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-24 h-24 bg-[#2B7A78] rounded-full top-10 left-10 opacity-20"></div>
          <div className="absolute w-32 h-32 bg-[#2B7A78] rounded-full bottom-20 right-20 opacity-20"></div>
          <div className="absolute w-16 h-16 bg-[#2B7A78] rounded-full top-1/2 left-1/2 opacity-20"></div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#3AAFA9] text-[#FEFFFF]">
                <th className="py-4 px-6 text-left">Rank</th>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold">{index + 1}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
