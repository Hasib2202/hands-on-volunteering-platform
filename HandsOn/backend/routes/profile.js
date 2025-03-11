const express = require("express");
const { User } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();

// GET logged-in user's profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving profile", error: err.message });
  }
});

// UPDATE logged-in user's profile (name, skills, and causes)
router.put("/", auth, async (req, res) => {
  const { name, skills, causes } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = name;
    user.skills = skills || user.skills;
    user.causes = causes || user.causes;
    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
});

// GET volunteer history & contributions (stub endpoint)
router.get("/history", auth, async (req, res) => {
  try {
   
    res.json({ message: "Volunteer history and contributions not implemented yet." });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving history", error: err.message });
  }
});

module.exports = router;
