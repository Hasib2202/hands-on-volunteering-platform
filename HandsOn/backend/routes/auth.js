const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err.message });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } }); // Include user details in the response
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
