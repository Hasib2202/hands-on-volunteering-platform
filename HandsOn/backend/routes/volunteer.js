const express = require("express");
const router = express.Router();
const { VolunteerLog, User, Event } = require("../models"); // Import all required models
const auth = require("../middleware/auth");
const generateCertificate = require("../utils/certificate");

// Log Volunteer Hours
router.post("/log-hours", auth, async (req, res) => {
  const { eventId, hours, description } = req.body;

  if (!eventId || !hours || hours <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const log = await VolunteerLog.create({
      userId: req.user.id,
      eventId,
      hours,
      description,
      status: "pending", // Default status for peer verification
    });

    res.json({ message: "Hours logged successfully", log });
  } catch (err) {
    res.status(500).json({ message: "Error logging hours", error: err.message });
  }
});

// Fetch Leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["points", "DESC"]], // Sort by points in descending order
      attributes: ["id", "name", "points"], // Only fetch necessary fields
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard", error: err.message });
  }
});

// Verify Volunteer Hours
router.post("/verify-hours/:id", auth, async (req, res) => {
  const { status } = req.body;

  if (!status || !["verified", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const log = await VolunteerLog.findByPk(req.params.id);

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    // Check if the user is not the one who logged the hours
    if (log.userId === req.user.id) {
      return res.status(403).json({ message: "You cannot verify your own logs" });
    }

    // Update the log status
    log.status = status;
    await log.save();

    // Add points if verified
    if (status === "verified") {
      const user = await User.findByPk(log.userId);
      user.points += log.hours * 5; // 5 points per hour
      await user.save();

      // Check for milestones and generate certificates
      const totalHours = user.points / 5; // Convert points to hours
      const certificate = generateCertificate(user, totalHours);
      if (certificate) {
        console.log("Certificate generated:", certificate); // Or send via email
      }
    }

    res.json({ message: "Verification recorded", log });
  } catch (err) {
    res.status(500).json({ message: "Error verifying hours", error: err.message });
  }
});


// Fetch Pending Logs
router.get("/pending-logs", auth, async (req, res) => {
  try {
    const logs = await VolunteerLog.findAll({
      where: { status: "pending" },
      include: [
        { model: User, as: "user", attributes: ["id", "name"] }, // Correct model reference
        { model: Event, as: "event", attributes: ["id", "title"] }, // Correct model reference
      ],
    });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending logs", error: err.message });
  }
});

module.exports = router;