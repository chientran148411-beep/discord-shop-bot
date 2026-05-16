const mongoose =
require("mongoose");

const schema =
new mongoose.Schema({

category: String,

name: String,

duration: String,

price: Number,

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
