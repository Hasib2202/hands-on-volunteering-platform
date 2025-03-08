const express = require("express");
const router = express.Router();
const { Comment, User, Post } = require("../models"); // Import your models

// List All Comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          as: "author", // Alias for the User association
          attributes: ["id", "name"], // Include only the id and name of the user
        },
        {
          model: Post,
          as: "post", // Alias for the Post association
          attributes: ["id", "title"], // Include only the id and title of the post
        },
      ],
      order: [["createdAt", "ASC"]], // Order comments by creation date
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
});

module.exports = router;