import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        toast.error("Error fetching event details");
        console.error(err);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <Toaster />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Time:</span> {event.time}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Location:</span> {event.location}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Category:</span> {event.category}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Cause:</span> {event.cause}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Max Attendees:</span> {event.maxAttendees || "No limit"}
          </p>
        </div>
        <div className="mt-6">
          <Link
            to="/events"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Events
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;