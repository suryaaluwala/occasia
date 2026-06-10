const express = require("express");

const router = express.Router();

const {
  getRestaurants,
  addRestaurant,
} = require("../controllers/restaurantController");

router.get("/", getRestaurants);

router.post("/", addRestaurant);

module.exports = router;