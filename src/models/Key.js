const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  productId: String,

  key: String,

  sold: {

    type: Boolean,

    default: false

  }

});

module.exports =
mongoose.model(
  "Key",
  schema
);
