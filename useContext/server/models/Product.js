const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  categoryName: {
    type: String,
    required: true,
  },
  // categoryPhoto: {
  //   type: String, // Assuming you store the path or URL to the photo
  //   required: true,
  // },
  productName: {
    type: String,
    required: true,
  },
  // productPhoto: {
  //   type: String, // Assuming you store the path or URL to the photo
  //   required: true,
  // },
  productPrice: {
    type: Number,
    required: true,
  },
  productExplanation: {
    type: String,
    required: true,
  },
  productPreparationTime: {
    type: String, // You can use String to store a formatted time, or use Number to store it in minutes
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
