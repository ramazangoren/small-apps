const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const photoSchema = new Schema({
    image: String,
  });
  

const PhotoModel = mongoose.model('Photo', photoSchema);

module.exports = PhotoModel;
