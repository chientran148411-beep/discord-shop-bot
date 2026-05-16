const mongoose = require("mongoose");

const schema =
new mongoose.Schema({

category: String,

name: String,

price: Number,

duration: String,

stock: {
type: Number,
default: 0
},

enabled: {
type: Boolean,
default: true
}

});

module.exports =
mongoose.model(
"Product",
schema
);
