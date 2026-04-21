import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const cartListProduct = async () => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let productArray = [];
  if (carts) {
    for (const cart of carts) {
      productArray.push(cart.id);
    }
  }
  try {
    let res = await axios.post(`${apiURL}/api/product/cart-product`, {
      productArray,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Get notifications
export const getUserNotifications = async () => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));

    const res = await fetch(
      `${apiURL}/api/notification/user-notifications/${jwt.user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  } catch (err) {
    console.log("Get Notification Error:", err);
  }
};

// Mark notification as read
export const markNotificationRead = async (id) => {
  try {
    const res = await fetch(
      `${apiURL}/api/notification/mark-notification-read/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  } catch (err) {
    console.log("Mark Notification Error:", err);
  }
};