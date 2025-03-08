import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Animated SVG Icons
const CategoryIcons = {
  environment: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#3AAFA9">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
        d="M3 7l3.5 4.5L7 9l4 6 5-9 3.5 4.5L21 7M3 7h18M3 7l3.5 4.5L7 9l4 6 5-9 3.5 4.5L21 7"/>
    </svg>
  ),
  education: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#3AAFA9">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
    </svg>
  ),
  community: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#3AAFA9">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const fetchEvents = async (filters = {}) => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", { params: filters });
      setEvents(res.data);
    } catch (err) {
      toast.error("Error fetching events");
    }
  };

  const joinEvent = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to join events");
      navigate("/login");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/join`, {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Joined event successfully");
    } catch (err) {
      toast.error("Error joining event");
    }
  };

  const handleCreateEventClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create an event");
      navigate("/login");
    } else {
      navigate("/createeventform");
    }
  };

  useEffect(() => { fetchEvents(filters); }, [filters]);

  return (
    <div className="min-h-screen bg-[#DEF2F1]">
      <Navbar activeLink="events" />
      <Toaster />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Filter Section */}
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-[#FEFFFF] rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-[#172521] mb-6">Find Your Perfect Opportunity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[#2B7A78] font-medium">Category</label>
                <select 
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full p-2 rounded-lg border border-[#3AAFA9] focus:ring-2 focus:ring-[#2B7A78]"
                >
                  <option value="">All Categories</option>
                  <option value="environment">Environment</option>
                  <option value="education">Education</option>
                  <option value="community">Community</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[#2B7A78] font-medium">Date</label>
                <input 
                  type="date"
                  onChange={(e) => setFilters({...filters, date: e.target.value})}
                  className="w-full p-2 rounded-lg border border-[#3AAFA9] focus:ring-2 focus:ring-[#2B7A78]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#2B7A78] font-medium">Location</label>
                <input 
                  type="text"
                  placeholder="Enter location"
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="w-full p-2 rounded-lg border border-[#3AAFA9] focus:ring-2 focus:ring-[#2B7A78]"
                />
              </div>
            </div>

            {/* Create Event Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCreateEventClick}
                className="bg-[#3AAFA9] text-white px-6 py-3 rounded-lg hover:bg-[#2B7A78] transition-colors"
              >
                Create Event
              </button>
            </div>
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {events.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#FEFFFF] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="mb-4 flex justify-center"
                  >
                    {CategoryIcons[event.category] || CategoryIcons.community}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-[#172521] mb-2">Event Name:{event.title}</h3>
                  <p className="text-[#2B7A78] mb-4">Descriptions:{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-[#3AAFA9]">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Date:
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-[#3AAFA9]">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Location: 
                      {event.location}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => joinEvent(event.id)}
                    className="w-full bg-[#3AAFA9] text-[#FEFFFF] py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
                  >
                    Join Event
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-[#2B7A78] rounded-2xl p-8 text-center my-12"
          >
            <h3 className="text-3xl font-bold text-[#FEFFFF] mb-8">Our Impact in Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "1k+", label: "Volunteers Engaged" },
                { number: "500+", label: "Events Hosted" },
                { number: "10k+", label: "Hours Contributed" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#FEFFFF] p-6 rounded-xl"
                >
                  <div className="text-4xl font-bold text-[#2B7A78] mb-2">{stat.number}</div>
                  <div className="text-[#172521]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Events;