const Order = require("../models/Order");

// Create a new order
const createOrder = async (req, res) => {
  const { sellerId, productId, quantity, totalPrice } = req.body;

  if (!sellerId || !productId || !quantity || !totalPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newOrder = new Order({ sellerId, productId, quantity, totalPrice });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOrder, getOrders };
