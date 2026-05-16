const mongoose = require("mongoose");

const schema =
new mongoose.Schema({

userId: String,

products: [
String
],

totalSpent: {
type: Number,
default: 0
}

});

module.exports =
mongoose.model(
"User",
schema
);
