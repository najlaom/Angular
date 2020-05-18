const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const schema = mongoose.Schema;
const eventSchema = schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true
  },
  partner:
  {
    type: schema.Types.ObjectId,
    ref: "partner",
    required: true
  },
  numberParticipants: {
    type: Number,
    required: true
  },
  maxNumberParticipant: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  zone: {
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
eventSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.adress);
  this.zone = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }
  //do not save addres
  this.adress = undefined;
  next();
});

module.exports = mongoose.model('event', eventSchema);