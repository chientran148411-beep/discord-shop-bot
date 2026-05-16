const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  userId: String,

  productName: String,

  key: String,

  createdAt: {

    type: Date,

    default: Date.now

  }

});

module.exports =
mongoose.model(
  "Order",
  schema
);
