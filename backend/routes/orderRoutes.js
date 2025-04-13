const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder); // Create a new order
router.get("/", getOrders); // Get all orders

module.exports = router;
