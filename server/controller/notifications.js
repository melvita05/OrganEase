//const Notification = require("../models/notifications");

//const jwt = require("jsonwebtoken");

const Notification = require("../models/notifications");

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({ notifications });
  } catch (err) {
    console.log("Notification Fetch Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

  // Mark notification as read
 exports.markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndUpdate(id, { status: "read" });

    return res.status(200).json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};