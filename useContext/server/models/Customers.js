const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  name: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("Customer", CustomerSchema);

module.exports = UserModel;
