import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrophy } from "react-icons/fa";
import {
  FaHome,
  FaUser,
  FaCalendar,
  FaNewspaper,
  FaUsers,
  FaBell,
  FaHistory,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed top-4 left-4 z-50 flex flex-col items-start">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-[#136a8a] text-white rounded-lg shadow-lg hover:bg-[#267871] transition duration-300 pb-1"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        {/* <div className="mt-4 p-4 text-center">
          <h1 className="text-2xl font-bold text-white">VolunteerHub</h1>
          <p className="text-sm text-gray-200">Empowering Communities</p>
        </div> */}
      </div>

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#136a8a] to-[#267871] shadow-lg flex flex-col justify-between transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Navigation Links */}
        <div className="flex-1 flex flex-col space-y-2 p-4 mt-20">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          {/* <NavLink
            to="/navigation"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaHome />
            <span>Navigation</span>
          </NavLink> */}

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-3 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaTrophy size={20} />
            <span>Leaderboard</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaUser />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaCalendar />
            <span>Events</span>
          </NavLink>
          <NavLink
            to="/createeventform"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaCalendar />
            <span>Create Event</span>
          </NavLink>

          <NavLink
            to="/create-help-request"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaNewspaper />
            <span>Create Help Request</span>
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaNewspaper />
            <span>Posts</span>
          </NavLink>

          <NavLink
            to="/create-team"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaUsers />
            <span>Team Create</span>
          </NavLink>

          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaUsers />
            <span>Teams</span>
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaBell />
            <span>Notifications</span>
          </NavLink>
          {/* <NavLink
            to="/volunteer-history"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaHistory />
            <span>Volunteer History</span>
          </NavLink> */}

          <NavLink
            to="/pending-logs"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaHistory />
            <span>Pending Logs</span>
          </NavLink>

          <NavLink
            to="/certificates"
            className={({ isActive }) =>
              `text-white hover:bg-[#267871] px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 ${
                isActive ? "bg-[#267871]" : ""
              }`
            }
          >
            <FaHistory />
            <span>Certificates</span>
          </NavLink>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaTimes />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
