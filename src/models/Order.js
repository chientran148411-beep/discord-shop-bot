const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: String,

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  keyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Key"
  },

  price: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "Order",
  orderSchema
);
