const mongoose = require("mongoose");

const schema =
new mongoose.Schema({

product: String,

key: String,

used: {
type: Boolean,
default: false
}

});

module.exports =
mongoose.model(
"Key",
schema
);
