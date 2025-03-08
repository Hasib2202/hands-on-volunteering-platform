import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Sidebar from "../components/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Sidebar open state controlled by Dashboard
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Dummy data for Volunteer History Bar Chart
  const volunteerHistoryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Volunteer Hours",
        data: [10, 20, 15, 25, 30, 22],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  const volunteerHistoryOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Volunteer Hours Per Month" },
    },
  };

  // Dummy data for Daily Login Pie Chart
  const dailyLoginData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Logins",
        data: [50, 60, 55, 70, 65, 80, 75],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#66FF66",
        ],
      },
    ],
  };

  const dailyLoginOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Daily Login Count" },
    },
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Sidebar) */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Dashboard Content */}
      <div
        className={`flex-1 bg-gradient-to-r from-gray-100 to-gray-200 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header with User Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center">
          <img
            src="https://github.com/shadcn.png"
            alt="User"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">
              Welcome Back, {user.name}!
            </h2>
            {user.skills && user.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Volunteer History Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Bar data={volunteerHistoryData} options={volunteerHistoryOptions} />
          </div>
          {/* Daily Login Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Pie data={dailyLoginData} options={dailyLoginOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
