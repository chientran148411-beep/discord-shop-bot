const mongoose =
require("mongoose");

module.exports =
mongoose.model(
  "Key",
  new mongoose.Schema({

    productId: String,

    key: String,

    used: {
      type: Boolean,
      default: false
    }

  })
);
