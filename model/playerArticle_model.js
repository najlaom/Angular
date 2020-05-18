const mongoose = require('mongoose');

const schema = mongoose.Schema;
const player_itemSchema= schema({
     
      date_aquisition:{
        type: Date,
        default: Date.now
      },
      date_perdu:{
        type: Date,
        default: Date.now
      },
      player:{
        type: schema.Types.ObjectId,
        ref: "player",
        required: true
      },
      article: 
        {
          type: schema.Types.ObjectId,
          ref: "article",
          required: true  
    }
    
}); 

module.exports = mongoose.model('player_item', player_itemSchema);