const mongoose = require("mongoose");
const MongooseUser = require("../models/User");
const localDb = require("../localDb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserModel = () => {
  return mongoose.connection.readyState === 1 ? MongooseUser : localDb.User;
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const User = getUserModel();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = getUserModel();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile details", error });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const User = getUserModel();
    const userId = req.user._id;
    const { name, phone, dob, dietaryPreferences, addresses, walletBalance, loyaltyPoints } = req.body;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (dob !== undefined) updateData.dob = dob;
    if (dietaryPreferences !== undefined) updateData.dietaryPreferences = dietaryPreferences;
    if (addresses !== undefined) updateData.addresses = addresses;
    if (walletBalance !== undefined) updateData.walletBalance = walletBalance;
    if (loyaltyPoints !== undefined) updateData.loyaltyPoints = loyaltyPoints;

    let updatedUser;
    if (mongoose.connection.readyState === 1) {
      updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    } else {
      updatedUser = await User.findByIdAndUpdate(userId, updateData);
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile details", error });
  }
};
