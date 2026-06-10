const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    items: [OrderItemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Order Received",
        "Preparing Food",
        "Packed",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Received",
    },
    paymentMethod: {
      type: String,
      default: "Wallet",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refunded"],
      default: "Paid",
    },
    deliveryDetails: {
      name: { type: String, default: "Rohan Sharma" },
      phone: { type: String, default: "+91 98765 43210" },
      address: { type: String, required: true },
      estimatedTime: { type: String, default: "35 mins" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
