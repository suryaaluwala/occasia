const express = require("express");
const router = express.Router();
const {
  getBookings,
  createBooking,
  cancelBooking,
} = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware");

// All booking routes require authentication
router.use(auth);

router.get("/", getBookings);
router.post("/", createBooking);
router.put("/:id/cancel", cancelBooking);

module.exports = router;
