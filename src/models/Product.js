const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  category: String,

  name: String,

  duration: String,

  price: String,

  enabled: {

    type: Boolean,

    default: true

  },

  sold: {

    type: Number,

    default: 0

  }

});

module.exports =
mongoose.model(
  "Product",
  schema
);
