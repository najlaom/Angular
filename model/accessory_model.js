const mongoose = require('mongoose');
const schema = mongoose.Schema;
const accessorySchema = schema({
      intitule:{
        type: String,
        required: true
      },
      title:{
        type: String,
        required: true,
        
      },
      state:{
        type: Boolean,
       required: true
      },
      image:{
        type: String,
        required: true
      },
      price:{
        type: Number,
        required: true
      },
      startDate:{
        type: Date,
        //required: true
      },
      endDate:{
        type: Date,
       required: true
      }
      
}, { timestamps: true }); 
module.exports = mongoose.model('accessory', accessorySchema);