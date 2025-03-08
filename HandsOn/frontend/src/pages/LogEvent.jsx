import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import LogHoursForm from "../components/LogHoursForm";

// Category icons for event cards
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

const LogEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      toast.error("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar activeLink="log-event" />
      <Toaster />

      {/* Hero/Banner Section */}
      <div className="bg-[#3AAFA9] py-20 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-[#FEFFFF] mb-4">Log Your Volunteer Hours</h1>
          <p className="text-xl text-[#FEFFFF]">Track your impact and make a difference!</p>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-24 h-24 bg-[#2B7A78] rounded-full top-10 left-10 opacity-20"></div>
          <div className="absolute w-32 h-32 bg-[#2B7A78] rounded-full bottom-20 right-20 opacity-20"></div>
          <div className="absolute w-16 h-16 bg-[#2B7A78] rounded-full top-1/2 left-1/2 opacity-20"></div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                
                <h3 className="text-xl font-bold text-[#172521] mb-2">
                  Event Name: {event.title}
                </h3>
                <p className="text-[#2B7A78] mb-4">
                  Descriptions: {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-[#3AAFA9]">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Date: {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-[#3AAFA9]">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location: {event.location}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-[#3AAFA9] text-[#FEFFFF] py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
                >
                  Log Hours
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#3AAFA9] py-8 mt-16">
        <div className="container mx-auto text-center text-[#FEFFFF]">
          <p className="text-lg">Join us in making the world a better place!</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-[#2B7A78] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.56v14.91c0 .98-.81 1.78-1.79 1.78h-20.5c-.98 0-1.79-.8-1.79-1.78v-14.91c0-.98.81-1.78 1.79-1.78h20.5c.98 0 1.79.8 1.79 1.78zm-11.5 10.91l-5.93-4.12v8.23l5.93-4.11zm-1.5-1.14l6.13 4.26h-12.26l6.13-4.26zm-6.13-5.15l6.13 4.26-6.13 4.26v-8.52zm12.26 0v8.52l-6.13-4.26 6.13-4.26z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#2B7A78] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 5.924c-.806.358-1.67.6-2.577.708a4.515 4.515 0 001.98-2.49 9.036 9.036 0 01-2.86 1.09 4.507 4.507 0 00-7.682 4.108 12.8 12.8 0 01-9.29-4.71 4.507 4.507 0 001.394 6.015 4.48 4.48 0 01-2.04-.563v.057a4.507 4.507 0 003.616 4.415 4.52 4.52 0 01-2.034.077 4.507 4.507 0 004.21 3.13 9.038 9.038 0 01-5.6 1.93c-.364 0-.724-.021-1.08-.063a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.195-.004-.39-.013-.584a9.17 9.17 0 002.26-2.34z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#2B7A78] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {selectedEvent && (
        <LogHoursForm
          eventId={selectedEvent.id}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default LogEvent;