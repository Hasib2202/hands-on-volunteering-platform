const express = require("express");
const { Event, User } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();

// Create Event
router.post("/", auth, async (req, res) => {
  const { title, description, location, date, time, category, cause, maxAttendees } = req.body;
  if (!title || !description || !location || !date || !time || !category || !cause) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const event = await Event.create({ title, description, location, date, time, category, cause, maxAttendees });
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
});



// List Events with Filters
router.get("/", async (req, res) => {
  try {
    const { category, location, upcoming, date } = req.query;
    const whereClause = {};
    const { Op } = require("sequelize");

    if (category) {
      whereClause.category = category;
    }
    if (location) {
      whereClause.location = location;
    }
    if (date) {
      // Filter events occurring on the selected date.
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      whereClause.date = { [Op.gte]: selectedDate, [Op.lt]: nextDay };
    } else if (upcoming === "true") {
      whereClause.date = { [Op.gte]: new Date() };
    }

    const events = await Event.findAll({ where: whereClause });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err.message });
  }
});


// Join Event
router.post("/:id/join", auth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if user is already attending
    const isAttending = await event.hasAttendee(req.user.id);
    if (isAttending) {
      return res.status(400).json({ message: "You are already attending this event" });
    }

    // Add user to attendees
    await event.addAttendee(req.user.id);
    res.json({ message: "Joined event successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error joining event", error: err.message });
  }
});
// Get Event Details by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{ model: User, as: "attendees" }], // Include attendees
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event details", error: err.message });
  }
});
module.exports = router;
