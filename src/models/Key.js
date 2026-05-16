const mongoose =
require("mongoose");

const schema =
new mongoose.Schema({

product: String,

key: String

});

module.exports =
mongoose.model(
"Key",
schema
);
