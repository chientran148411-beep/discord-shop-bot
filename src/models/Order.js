const mongoose =
require("mongoose");

module.exports =
mongoose.model(
  "Order",
  new mongoose.Schema({

    orderCode: String,

    userId: String,

    productId: String,

    price: Number,

    status: {
      type: String,
      default: "pending"
    }

  })
);
