const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  username: String,

  password: String,

  sold: {
    type: Boolean,
    default: false
  },

  soldTo: {
    type: String,
    default: null
  },

  soldAt: {
    type: Date,
    default: null
  }

});

module.exports = mongoose.model(
  "Key",
  keySchema
);
