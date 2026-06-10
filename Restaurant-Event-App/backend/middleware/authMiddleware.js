const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const MongooseUser = require("../models/User");
const localDb = require("../localDb");

const getUserModel = () => {
  return mongoose.connection.readyState === 1 ? MongooseUser : localDb.User;
};

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
    const User = getUserModel();
    // In localDb user has findOne({ _id: decoded.id }), let's handle query by id
    const query = mongoose.connection.readyState === 1 ? { _id: decoded.id } : { _id: decoded.id };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
