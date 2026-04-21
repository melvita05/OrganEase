// backend/routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const Notification = require("../models/notifications");

// Get notifications for logged-in user
router.get("/user-notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.params.userId,
    })
      .sort({ createdAt: -1 })
      .populate("order");

    return res.status(200).json({ notifications });
  } catch (err) {
    console.log("Get Notifications Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Mark one notification as read
router.put("/mark-notification-read/:id", async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      notification: updatedNotification,
    });
  } catch (err) {
    console.log("Mark Notification Read Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;