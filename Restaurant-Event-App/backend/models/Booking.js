const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
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
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      default: 2,
    },
    seatingPreference: {
      type: String,
      enum: ["Indoor", "Outdoor", "Family Area", "VIP Table"],
      default: "Indoor",
    },
    specialRequests: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
