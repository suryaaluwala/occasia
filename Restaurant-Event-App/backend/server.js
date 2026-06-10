const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug
console.log("MONGO_URI =", process.env.MONGO_URI);

// Seeding helper
const seedDefaultRestaurants = async () => {
  try {
    const MongooseRestaurant = require("./models/Restaurant");
    const localDb = require("./localDb");
    const Restaurant = mongoose.connection.readyState === 1 ? MongooseRestaurant : localDb.Restaurant;
    
    const existing = await Restaurant.find();
    if (existing && existing.length > 0) {
      console.log("Restaurants already seeded, total:", existing.length);
      return;
    }

    const defaultRestaurants = [
      {
        name: "The Grand Occasia",
        location: "Jubilee Hills, Hyderabad",
        description: "Fine dining luxury. Multi-cuisine gourmet culinary delights with visual themes.",
        activities: ["Regular Dining", "Event Planning", "Stealth Mode"],
        themes: ["Modern Luxury", "Royal Banquet", "Glassmorphic Lounge"],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Terrace Fusion",
        location: "Gachibowli, Hyderabad",
        description: "Scenic terrace outdoor lounge offering oriental appetizers and sunset mocktails.",
        activities: ["Regular Dining", "Stealth Mode"],
        themes: ["Sunset Skyline", "Tropical Garden"],
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "La Bella Italia",
        location: "Banjara Hills, Hyderabad",
        description: "Charming local Trattoria serving authentic Neapolitan wood-fired pizzas and homemade pasta.",
        activities: ["Regular Dining", "Event Planning"],
        themes: ["Rustic Tuscan", "Venetian Romance"],
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60"
      },
      {
        name: "Sakura Zen",
        location: "Hitech City, Hyderabad",
        description: "Intimate Japanese sushi bar and private rooms designed for high-privacy VIP dining.",
        activities: ["Regular Dining", "Stealth Mode"],
        themes: ["Traditional Tatami", "Neon Cyberpunk"],
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=60"
      }
    ];

    for (const rest of defaultRestaurants) {
      await Restaurant.create(rest);
    }
    console.log("Successfully seeded 4 default premium restaurants!");
  } catch (err) {
    console.error("Error seeding default restaurants:", err);
  }
};

// MongoDB Connection
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
      seedDefaultRestaurants();
    })
    .catch((err) => {
      console.log("MongoDB Error:", err);
      // Seed locally if Mongo connection fails
      seedDefaultRestaurants();
    });
} else {
  console.log("No MONGO_URI environment variable set. Falling back to local database.");
  seedDefaultRestaurants();
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Occasia DineVerse API Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});