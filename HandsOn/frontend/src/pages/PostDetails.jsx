import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        toast.error("Error fetching post details");
        console.error(err);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a comment");
      navigate("/login"); // Redirect to login page
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${id}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Comment added successfully");
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, res.data.comment],
      }));
      setComment("");
    } catch (err) {
      toast.error("Error adding comment");
      console.error(err);
    }
  };

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
        <Navbar />
        <div className="flex-grow container mx-auto p-6 text-center">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#DEF2F1] to-[#BEE3DB]">
      <Navbar />
      <Toaster />
      <div className="flex-grow container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-[#172521] mb-4">{post.title}</h2>
          <p className="text-[#2B7A78] mb-4">{post.description}</p>
          <div className="space-y-2 mb-6">
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

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-[#172521] mb-4">Comments</h3>
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#DEF2F1] p-4 rounded-lg mb-2"
              >
                <p className="text-[#2B7A78]">{comment.content}</p>
                <p className="text-sm text-[#3AAFA9] mt-1">
                  - {comment.author ? comment.author.name : "Unknown"}
                </p>
              </div>
            ))}

            {/* Add Comment Form */}
            <div className="mt-6">
              <textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-[#3AAFA9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B7A78]"
              />
            </div>
          </div>

          {/* Add Comment and Back to Posts Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handleAddComment}
              className="bg-[#3AAFA9] text-white px-6 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
            >
              Add Comment
            </button>
            <Link
              to="/posts"
              className="bg-[#172521] text-white px-6 py-2 rounded-lg hover:bg-[#2B7A78] transition-colors"
            >
              Back to Posts
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;