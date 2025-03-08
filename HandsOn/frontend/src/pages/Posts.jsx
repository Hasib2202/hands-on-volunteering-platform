import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        toast.error("Error fetching help requests");
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#172521]">
          Community Help Requests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-[#172521] mb-4">
                {post.title}
              </h3>
              <p className="text-[#2B7A78] mb-4">{post.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-[#3AAFA9]">
                  <span className="font-semibold">Category:</span> {post.category}
                </p>
                <p className="text-sm text-[#3AAFA9]">
                  <span className="font-semibold">Cause:</span> {post.cause}
                </p>
                <p className="text-sm text-[#3AAFA9]">
                  <span className="font-semibold">Urgency:</span> {post.urgency}
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-[#3AAFA9] hover:text-[#2B7A78] font-semibold"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Posts;