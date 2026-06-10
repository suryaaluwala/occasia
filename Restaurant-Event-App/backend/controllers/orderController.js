const mongoose = require("mongoose");
const MongooseOrder = require("../models/Order");
const localDb = require("../localDb");

const getOrderModel = () => {
  return mongoose.connection.readyState === 1 ? MongooseOrder : localDb.Order;
};

// Get user orders list
exports.getOrders = async (req, res) => {
  try {
    const Order = getOrderModel();
    const query = { userId: req.user._id };
    const orders = await Order.find(query);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Create/Place an order
exports.createOrder = async (req, res) => {
  try {
    const Order = getOrderModel();
    const { restaurantId, restaurantName, items, subtotal, discount, tax, total, deliveryAddress, paymentMethod } = req.body;

    const orderData = {
      userId: req.user._id,
      restaurantId,
      restaurantName,
      items,
      subtotal: Number(subtotal),
      discount: Number(discount || 0),
      tax: Number(tax),
      total: Number(total),
      paymentMethod: paymentMethod || "Wallet",
      paymentStatus: "Paid",
      status: "Order Received",
      deliveryDetails: {
        name: "Rohan Sharma",
        phone: "+91 98765 43210",
        address: deliveryAddress,
        estimatedTime: "30-45 mins",
      },
    };

    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// Update order status (for live tracking simulation)
exports.updateOrderStatus = async (req, res) => {
  try {
    const Order = getOrderModel();
    const orderId = req.params.id;
    const { status } = req.body;

    const validStatuses = ["Order Received", "Preparing Food", "Packed", "Out for Delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    let updatedOrder;
    if (mongoose.connection.readyState === 1) {
      updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    } else {
      updatedOrder = await Order.findByIdAndUpdate(orderId, { status });
    }

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};
