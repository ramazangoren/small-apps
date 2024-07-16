const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String }, // Assuming logo is a URL or file path
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  mondayOpens: { type: String },
  mondayCloses: { type: String },
  tuesdayOpens: { type: String },
  tuesdayCloses: { type: String },
  wednesdayOpens: { type: String },
  wednesdayCloses: { type: String },
  thursdayOpens: { type: String },
  thursdayCloses: { type: String },
  fridayOpens: { type: String },
  fridayCloses: { type: String },
  saturdayOpens: { type: String },
  saturdayCloses: { type: String },
  sundayOpens: { type: String },
  sundayCloses: { type: String },
  country: { type: String },
  city: { type: String },
  county: { type: String },
  district: { type: String },
  fullAddress: { type: String },
  direction: { type: String },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
