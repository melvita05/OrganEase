const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");
const Notification = require("../models/notifications");  // ✅ ADD THIS

router.get("/all-user", usersController.getAllUser);
router.post("/signle-user", usersController.getSingleUser);

router.post("/add-user", usersController.postAddUser);
router.post("/edit-user", usersController.postEditUser);
router.post("/delete-user", usersController.getDeleteUser);

router.post("/change-password", usersController.changePassword);


router.get("/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({ notifications });

  } catch (err) {
    console.log("Notification Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
