const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    default: 0
  },

  enabled: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "Product",
  productSchema
);
