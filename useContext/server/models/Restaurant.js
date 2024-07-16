const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
      },
    name: String,
    location: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    phoneNumber: Number,
    extraInfo: String,
    aboutUs: String,
    mondayOpens: String,
    mondayCloses: String,
    tuesdayOpens: String,
    tuesdayCloses: String,
    wednesdayOpens: String,
    wednesdayCloses: String,
    thursdayOpens: String,
    thursdayCloses: String,
    fridayOpens: String,
    fridayCloses: String,
    saturdayOpens: String,
    saturdayCloses: String,
    sundayOpens: String,
    sundayCloses: String,
    extraInfo: String,
    paymentDetails:[String],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
