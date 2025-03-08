import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "./Footer";

const ProfileModal = ({ onClose }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skills: [],
    causes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        toast.error("Error fetching profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/api/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully");
      setProfile(res.data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) return <div>Loading...</div>;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-white z-40">
      <div className="bg-[#FEFFFF] rounded-lg shadow-xl p-8 w-11/12 max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#172521]">
          Profile
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-[#172521]">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full p-3 border border-[#3AAFA9] rounded-lg text-[#172521] focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#172521]">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 text-[#172521]"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#172521]">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={profile.skills.join(", ")}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full p-3 border border-[#3AAFA9] rounded-lg text-[#172521] focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#172521]">
              Causes (comma separated)
            </label>
            <input
              type="text"
              value={profile.causes.join(", ")}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  causes: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full p-3 border border-[#3AAFA9] rounded-lg text-[#172521] focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3AAFA9] text-[#FEFFFF] p-3 rounded-lg hover:bg-[#2B7A78] transition duration-300"
          >
            Update Profile
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#2B7A78] text-[#FEFFFF] p-3 rounded-lg hover:bg-[#3AAFA9] transition duration-300"
        >
          Close
        </button>  
        <Footer />

      </div>
    </div>,
    document.body
    
    
  );
};

export default ProfileModal;
