const { model, Schema } = require("mongoose");

const Register = new Schema({
  email: String,
  name: String,
  phone: Number,
  state: String,
  town: String,
});

module.exports = model("Register", Register);
