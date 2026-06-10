const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

// All order routes require authentication
router.use(auth);

router.get("/", getOrders);
router.post("/", createOrder);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
