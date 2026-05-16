const mongoose =
require("mongoose");

const schema =
new mongoose.Schema({

userId: String,

purchases: Array

});

module.exports =
mongoose.model(
"User",
schema
);
