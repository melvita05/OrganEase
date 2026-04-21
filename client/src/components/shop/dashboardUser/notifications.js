// frontend/src/components/Notifications.js
import React, { useEffect, useState } from "react";
import Layout from "../layout";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/notifications/${user._id}`
      );

      const data = await res.json();

      if (data.notifications) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Your Notifications</h2>

      {notifications.length === 0 && <p>No notifications yet</p>}

      {notifications.map((item) => (
        <div
          key={item._id}
          className="border p-3 mb-3 rounded bg-gray-100"
        >
          <p>{item.message}</p>
          <small>Status: {item.status}</small>
          <br />
          <small>
            {new Date(item.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Notifications;