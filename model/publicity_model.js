const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const schema = mongoose.Schema;
const publicitySchema = schema({
  namePublicity: {
    type: String,
    required: true
    
  },
   description: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  partner:
  {
    type: schema.Types.ObjectId,
    ref: "partner",
    required: true
  },
  url: {
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
      // required: true
    }
  },
  startDate: {
    type: Date,
    default: Date.now,
    // required: true
  },
  endDate: {
    type: Date,
    // required: true
  }
} ,  { timestamps: true });

publicitySchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.url);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }
  //do not save addres
  this.url = undefined;
  next();
});
module.exports = mongoose.model('publicity', publicitySchema);