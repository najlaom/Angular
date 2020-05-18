const mongoose = require('mongoose');
const schema = mongoose.Schema;
const player_accessorySchema = schema({
      date_utilisble:{
        type: Date,
        //required: true
      },
      date_aqui:{
        type: Date,
       // required: true
      },
      partner:[{
        type: schema.Types.ObjectId,
        ref:'partner',
        required: true
      }],
      accessory:{
        type: schema.Types.ObjectId,
        ref: 'accessory',
        required: true
      },
      position_utilisable: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
         // required: true
        },
        coordinates: {
          type: [Number],
         // required: true
        }
      }
}); 

module.exports = mongoose.model('player_accessory', player_accessorySchema);