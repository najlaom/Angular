const mongoose = require('mongoose');

const schema = mongoose.Schema;
const event_playerSchema = schema({
     
      description_Date:{
        type: Date,
        default: Date.now
      },
      event:{
        type: schema.Types.ObjectId,
        ref: "event",
        required: true
      },
      player: 
        {
          type: schema.Types.ObjectId,
          ref: "player",
          required: true  
    }
    
}); 

module.exports = mongoose.model('event_player', event_playerSchema);