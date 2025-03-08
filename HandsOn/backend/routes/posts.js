const express = require("express");
const { Post, Comment, User } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a Help Request
router.post("/", auth, async (req, res) => {
  const { title, description, category, cause, urgency } = req.body;

  if (!title || !description || !category || !cause) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const post = await Post.create({
      title,
      description,
      category,
      cause,
      urgency,
      userId: req.user.id, // Link to the author
    });

    res.status(201).json({ message: "Help request created successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Error creating help request", error: err.message });
  }
});

// List All Help Requests
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: "author", attributes: ["id", "name"] }], // Include author details
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching help requests", error: err.message });
  }
});

// Add a Comment to a Help Request
router.post("/:id/comments", auth, async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  try {
    const comment = await Comment.create({
      content,
      userId: req.user.id, // Link to the comment author
      postId: req.params.id, // Link to the post
    });

    // Fetch the comment with the author data
    const commentWithAuthor = await Comment.findByPk(comment.id, {
      include: [{ model: User, as: "author", attributes: ["id", "name"] }],
    });

    res.status(201).json({ message: "Comment added successfully", comment: commentWithAuthor });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: "author", attributes: ["id", "name"] }, // Include post author
        {
          model: Comment,
          as: "comments",
          include: [{ model: User, as: "author", attributes: ["id", "name"] }], // Include comment author
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post details", error: err.message });
  }
});

module.exports = router;