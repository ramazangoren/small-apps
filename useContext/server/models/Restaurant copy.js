// /*
// main photo(s): to be displayed when user enters the restaurant page
// name:
// logo:
// location: this will be a link from google for now
// phone number:
// working: hours: this will be array of working hours for the days
// category: we will add them (for the sake of copmlication)
// product: this will be an array of photo, name, price 
// */


// const mongoose = require('mongoose');

// // Define the schema for the product
// // const productSchema = new mongoose.Schema({
// //     photo: String,
// //     name: String,
// //     price: Number
// // });

// // Define the schema for the restaurant
// const restaurantSchema = new mongoose.Schema({
//     owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Customer"},
//     mainPhotos: [String],
//     name: String,
//     logo: [String],
//     location: {
//         type: String,
//         validate: {
//             validator: function(v) {
//                 return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
//             },
//             message: props => `${props.value} is not a valid URL!`
//         }
//     },
//     phoneNumber: Number,
//     workingHours: {
//         monday: [
//           {
//             // day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
//             open: {type: Date, required: true}, 
//             close: {type: Date, required: true},
//           }
//         ],
//         default: [],
//       },
//     categories: [String],
//     // products: [productSchema]
// });

// // Create the Mongoose model
// const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// module.exports = Restaurant;
