const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const schema = mongoose.Schema;
const playerSchema = schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    //required: true
  },
  age: {
    type: Number,
    // required: true
  },
  phoneNumber: {
    type: Number,
    // required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  coins: {
    type: Number,
    //   required: true
  },
  gems: {
    type: Number,
    // required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  role:{
    type: String
  },
  adress: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      // required: true
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
      // required: true
    },
    formattedAddress: String
  }
}, { timestamps: true });
playerSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.adress);
  this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
  }
  //do not save addres
  this.adress = undefined;
  next();
});
module.exports = mongoose.model('player', playerSchema);