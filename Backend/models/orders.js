const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Order", orderSchema);