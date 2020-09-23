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
    email: { type: String, minlength: 5, maxlength: 255, default: "" },
    password: { type: String, minlength: 8, maxlength: 255 },
  })
);

module.exports = User;
