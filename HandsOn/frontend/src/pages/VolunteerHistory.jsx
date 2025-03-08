import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";

const VolunteerHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/contributions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (err) {
        toast.error("Error fetching volunteer history");
      }
    };
    fetchHistory();
  }, []);

  return (
    <Layout>
      <Toaster />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Volunteer History & Contributions</h2>
        {history.length === 0 ? (
          <p>No volunteer history found.</p>
        ) : (
          <ul>
            {history.map((contribution) => (
              <li key={contribution.id} className="border-b py-2">
                <div className="flex justify-between">
                  <span className="font-bold">
                    {contribution.event?.title || "Event Title"}
                  </span>
                  <span>{new Date(contribution.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-1">
                  <span>Hours: {contribution.hours}</span>
                  {contribution.comment && (
                    <p className="text-sm text-gray-600">
                      Comment: {contribution.comment}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default VolunteerHistory;
