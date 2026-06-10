const mongoose = require("mongoose");
const MongooseRestaurant = require("../models/Restaurant");
const localDb = require("../localDb");

const getRestaurantModel = () => {
  return mongoose.connection.readyState === 1 ? MongooseRestaurant : localDb.Restaurant;
};

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const Restaurant = getRestaurantModel();
    const restaurants = await Restaurant.find();

    res.json(restaurants);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add restaurant
exports.addRestaurant = async (req, res) => {
  try {
    const Restaurant = getRestaurantModel();
    const restaurant =
      await Restaurant.create(req.body);

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json(error);
  }
};