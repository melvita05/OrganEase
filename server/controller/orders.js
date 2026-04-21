const orderModel = require("../models/orders");
const User = require("../models/users");
const Notification = require("../models/notifications");

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice pincode organId")
        .populate("user", "name email")
        .sort({ _id: -1 });

      return res.json({ Orders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async getOrderByUser(req, res) {
    try {
      const { uId } = req.body;

      console.log("User ID Received:", uId);

      if (!uId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const Order = await orderModel
        .find({ user: uId })
        .populate("allProduct.id", "pName pImages pPrice pincode organId")
        .populate("user", "name email")
        .sort({ _id: -1 });

      console.log("Orders Found:", Order);

      return res.status(200).json({ Order });
    } catch (err) {
      console.log("Get Order By User Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async postCreateOrder(req, res) {
    try {
      console.log("Incoming Order:", req.body);

      const { allProduct, user, amount, address, phone } = req.body;

      if (!allProduct || !user || !address || !phone) {
        return res.status(400).json({ error: "All fields required" });
      }

      const newOrder = new orderModel({
        allProduct,
        user,
        amount,
        address,
        phone,
        status: "Not processed",
      });

      const savedOrder = await newOrder.save();

      console.log("Order Saved:", savedOrder);

      return res.status(200).json({
        success: true,
        message: "Order created successfully",
      });
    } catch (err) {
      console.log("Order Save Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async postUpdateOrder(req, res) {
  try {
    const { oId, status } = req.body;

    if (!oId || !status) {
      return res.status(400).json({ error: "Order ID and status are required" });
    }

    // Update order status
    const updatedOrder = await orderModel.findByIdAndUpdate(
      oId,
      {
        status: status,
        updatedAt: Date.now(),
      },
      { new: true }
    ).populate("user", "_id name email");

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Create notification
    const newNotification = new Notification({
      user: updatedOrder.user._id,
      order: updatedOrder._id,
      message: `Your organ request status has been updated to "${status}"`,
      status: "unread",
    });

    await newNotification.save();

    return res.status(200).json({
      success: true,
      message: "Order updated and notification sent",
      order: updatedOrder,
    });
  } catch (err) {
    console.log("Update Order Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;