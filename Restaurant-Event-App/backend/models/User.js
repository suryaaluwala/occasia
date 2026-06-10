const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "customer",
    },
    phone: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    dietaryPreferences: {
      type: [String],
      default: [],
    },
    addresses: {
      type: [String],
      default: [],
    },
    loyaltyPoints: {
      type: Number,
      default: 120, // Give some default starting points
    },
    walletBalance: {
      type: Number,
      default: 1000, // Give some default starter balance
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);