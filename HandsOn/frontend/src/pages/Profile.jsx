import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";

const Profile = () => {
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
      toast.error(
        err.response?.data?.message || "Error updating profile"
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <Toaster />
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full p-2 border rounded bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
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
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
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
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
        <div className="mt-8">
          <h3 className="text-xl font-bold">
            Volunteer History & Contributions
          </h3>
          <p className="mt-2">Coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
