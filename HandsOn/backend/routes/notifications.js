const express = require("express");
const { Notification } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();

// Get notifications for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { userId: req.user.id } });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications", error: err.message });
  }
});

// [ Mark notification as read ]
router.put("/:id/read", auth, async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Error updating notification", error: err.message });
  }
});

module.exports = router;
