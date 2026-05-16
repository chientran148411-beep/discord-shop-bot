const mongoose = require('mongoose');

module.exports = mongoose.model(

  "Order",

  new mongoose.Schema({

    userId: String,

    productId: String,

    account: String,

    password: String,

    price: Number,

    orderCode: String,

    createdAt: {
      type: Date,
      default: Date.now
    }

  })

);
