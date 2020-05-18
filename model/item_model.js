//const multilanguage = require ('multilanguage_model'); 
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const itemSchema = schema({
  
      intitule:{
        type: String,
      required: true
      },
      type:{
        type: schema.Types.ObjectId,
        ref: "typeArticle",
       // required: true  
      },
      description:{
        type: String,
        required: true
      },
      partner: 
        {
          type: schema.Types.ObjectId,
          ref: "partner",
         required: true  
        },
     image:{
        type: String,
        //required: true
      },
      isActive:{
        type: Boolean,
        required: true
      },

}, 
{ timestamps: true });
module.exports = mongoose.model('item', itemSchema);