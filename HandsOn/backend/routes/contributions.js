const express = require("express");
const { Contribution, Event } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();

// GET contributions (volunteer history) for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const contributions = await Contribution.findAll({
      where: { userId: req.user.id },
      include: [{ model: Event, as: "event" }],
    });
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching volunteer history", error: err.message });
  }
});

// (Optional) POST endpoint to add a new contribution
router.post("/", auth, async (req, res) => {
  const { eventId, hours, comment } = req.body;
  if (!eventId || hours == null) {
    return res.status(400).json({ message: "Event and hours are required" });
  }
  try {
    const contribution = await Contribution.create({
      userId: req.user.id,
      eventId,
      hours,
      comment,
    });
    res.status(201).json(contribution);
  } catch (err) {
    res.status(500).json({ message: "Error adding contribution", error: err.message });
  }
});

module.exports = router;
