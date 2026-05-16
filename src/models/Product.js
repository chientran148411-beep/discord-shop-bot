const mongoose = require('mongoose');

module.exports = mongoose.model(

  "Product",

  new mongoose.Schema({

    categoryId: String,

    name: String,

    duration: String,

    price: Number,

    sold: {
      type: Number,
      default: 0
    },

    stock: [

      {

        account: String,

        password: String

      }

    ]

  })

);
