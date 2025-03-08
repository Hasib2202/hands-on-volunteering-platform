import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaHome,
  FaUser,
  FaCalendar,
  FaNewspaper,
  FaUsers,
  FaBell,
  FaTrophy,
  FaSignInAlt,
  FaUserPlus,
  FaCertificate,
  FaClock,
} from "react-icons/fa";
import ProfileModal from "./ProfileModal"; // Import the ProfileModal component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Modal state
  const [user, setUser] = useState({ name: "", skills: [] }); // User info state
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error fetching profile", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle login navigation
  const handleLogin = () => {
    navigate("/login");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false); // Update login state
    setIsDropdownOpen(false); // Close dropdown
    navigate("/"); // Redirect to home
  };

  // Handle profile click (open modal)
  const handleProfileClick = () => {
    setIsDropdownOpen(false); // Close dropdown
    setIsProfileModalOpen(true); // Open modal
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#172521] shadow-md">
      <Toaster />
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left - Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-bold text-[#DEF2F1]">🤝 HandsOn</div>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex-1 flex items-center justify-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78] ${
                isActive ? "bg-[#3AAFA9]" : ""
              }`
            }
          >
            <FaHome />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78] ${
                isActive ? "bg-[#3AAFA9]" : ""
              }`
            }
          >
            <FaTrophy />
            <span>Leaderboard</span>
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78] ${
                isActive ? "bg-[#3AAFA9]" : ""
              }`
            }
          >
            <FaCalendar />
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78] ${
                isActive ? "bg-[#3AAFA9]" : ""
              }`
            }
          >
            <FaNewspaper />
            <span>Posts</span>
          </NavLink>

          <NavLink
            to="/create-help-request"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78] ${
                isActive ? "bg-[#3AAFA9]" : ""
              }`
            }
          >
            <FaNewspaper />
            <span>Help Request</span>
          </NavLink>

          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78] ${
                isActive ? "bg-[#3AAFA9]" : ""
              }`
            }
          >
            <FaUsers />
            <span>Teams</span>
          </NavLink>

          {/* Show Notifications link only if logged in */}
          {isLoggedIn && (
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78] ${
                  isActive ? "bg-[#3AAFA9]" : ""
                }`
              }
            >
              <FaBell />
              <span>Notifications</span>
            </NavLink>
          )}
        </div>

        {/* Right - Login/Register or Profile */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78]"
              >
                <FaSignInAlt className="text-xl" />
                <span>Login</span>
              </button>
              <NavLink
                to="/register"
                className="flex items-center space-x-2 text-[#DEF2F1] px-4 py-2 rounded-lg transition duration-300 hover:bg-[#2B7A78]"
              >
                <FaUserPlus className="text-xl" />
                <span>Register</span>
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 bg-[#3AAFA9] rounded-full hover:bg-[#2B7A78] transition duration-300"
              >
                <FaUser className="text-[#DEF2F1]" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#FEFFFF] rounded-xl shadow-lg">
                  {/* Header with User Info */}
                  <div className="p-4 border-b border-[#DEF2F1]">
                    <div className="flex items-center">
                      <img
                        src="https://github.com/shadcn.png"
                        alt="User"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-[#172521]">
                          Welcome Back, {user.name}
                        </h2>
                        {user.skills && user.skills.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2 text-[#2B7A78] ">
                            Skill : 
                            {user.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-[#DEF2F1] text-[#2B7A78] px-2 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Links */}
                  <button
                    onClick={handleProfileClick}
                    className="block w-full px-4 py-2 text-[#172521] hover:bg-[#DEF2F1] transition duration-300 text-left"
                  >
                    <FaUser className="inline-block mr-2" />
                    Profile
                  </button>
                  <NavLink
                    to="/pending-logs"
                    className="block w-full px-4 py-2 text-[#172521] hover:bg-[#DEF2F1] transition duration-300 text-left"
                  >
                    <FaClock className="inline-block mr-2" />
                    Pending Logs
                  </NavLink>
                  <NavLink
                    to="/certificates"
                    className="block w-full px-4 py-2 text-[#172521] hover:bg-[#DEF2F1] transition duration-300 text-left"
                  >
                    <FaCertificate className="inline-block mr-2" />
                    Certificates
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-[#172521] hover:bg-[#DEF2F1] transition duration-300 text-left"
                  >
                    <FaSignInAlt className="inline-block mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;