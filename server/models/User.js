const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    googleId: String,
    facebookId: String,
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
      trim: true,
    },
    email: { type: String, default: "" },
    password: { type: String, minlength: 8 },
  })
);

module.exports = User;
