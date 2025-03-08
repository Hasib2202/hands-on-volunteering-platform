import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  // Fetch certificates for the logged-in user
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/certificates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCertificates(res.data);
      } catch (err) {
        toast.error("Error fetching certificates");
        console.error(err);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#172521]">Certificates</h2>
        <div className="space-y-4">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <pre className="whitespace-pre-wrap text-[#2B7A78]">{certificate}</pre>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Certificates;