const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    description: String,

    activities: [String],

    themes: [String],

    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Restaurant",
  RestaurantSchema
);