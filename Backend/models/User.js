const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
   cartData: {
    type: Object,
    default: {},
  },
   wishlist: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);