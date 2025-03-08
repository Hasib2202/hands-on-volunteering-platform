import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "./Footer";

const Testimonials = () => {
  const [comments, setComments] = useState([]);

  // Fetch comments from the backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/comments");
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-[#172521]">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#FEFFFF] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                {/* Display a random icon for the user */}
                <div className="text-4xl mb-6">😊</div>
                <p className="text-lg text-[#2B7A78] mb-6">{comment.content}</p>
                <p className="text-xl font-bold text-[#172521]">
                  {comment.author ? comment.author.name : "Anonymous"}
                </p>
                <p className="text-sm text-[#3AAFA9]">
                  {comment.post ? `Commented on: ${comment.post.title}` : "General Comment"}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Section */}
        <div className="mt-16 relative">
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-32 h-32 bg-[#3AAFA9] rounded-full opacity-10"></div>
            <div className="w-48 h-48 bg-[#3AAFA9] rounded-full opacity-10 absolute -top-12 -left-12"></div>
            <div className="w-48 h-48 bg-[#3AAFA9] rounded-full opacity-10 absolute -bottom-12 -right-12"></div>
          </div>
          <h3 className="text-2xl font-bold text-[#172521] relative z-10">
            Join Our Community Today!
          </h3>
          <p className="text-lg text-[#2B7A78] mt-4 relative z-10">
            Be part of something bigger. Volunteer, organize, and make a difference.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-[#3AAFA9] text-[#FEFFFF] px-8 py-3 rounded-lg hover:bg-[#2B7A78] transition-colors relative z-10"
          >
            
          </motion.button>
        </div>
      </div>

    </section>
    
  );
};

export default Testimonials;