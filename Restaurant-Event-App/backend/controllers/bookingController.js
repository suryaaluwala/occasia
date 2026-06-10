const mongoose = require("mongoose");
const MongooseBooking = require("../models/Booking");
const localDb = require("../localDb");

const getBookingModel = () => {
  return mongoose.connection.readyState === 1 ? MongooseBooking : localDb.Booking;
};

// Get all bookings for current user
exports.getBookings = async (req, res) => {
  try {
    const Booking = getBookingModel();
    const query = { userId: req.user._id };
    const bookings = await Booking.find(query);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const Booking = getBookingModel();
    const { restaurantId, restaurantName, date, timeSlot, guests, seatingPreference, specialRequests } = req.body;
    
    const bookingData = {
      userId: req.user._id,
      restaurantId,
      restaurantName,
      date,
      timeSlot,
      guests: Number(guests),
      seatingPreference,
      specialRequests: specialRequests || [],
      status: "Upcoming"
    };

    const booking = await Booking.create(bookingData);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const Booking = getBookingModel();
    const bookingId = req.params.id;

    let updatedBooking;
    if (mongoose.connection.readyState === 1) {
      updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status: "Cancelled" }, { new: true });
    } else {
      updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status: "Cancelled" });
    }

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking", error });
  }
};
