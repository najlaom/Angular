const mongoose = require('mongoose');

const schema = mongoose.Schema;
const publicity_playerSchema = schema({
     
     acquisition_Date:{
        type: Date,
        default: Date.now
      },
      expiration_Date:{
        type: Date,
        default: Date.now // à modifier
      },
      publicity:{
        type: schema.Types.ObjectId,
        ref: "publicity",
        required: true
      },
      player: 
        {
          type: schema.Types.ObjectId,
          ref: "player",
          required: true  
        },
        description:{
            type: String,
            required: true
          },
    
}); 

module.exports = mongoose.model('publicity_player', publicity_playerSchema);