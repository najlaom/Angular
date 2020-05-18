//const multilanguage = require ('multilanguage_model'); 
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const typeArticleSchema = schema({
  
      intitule:{
        type: String,
      //required: true
      },
      description:{
        type: String,
      //required: true
      }
    }, 
{ timestamps: true });
module.exports = typeArticleSchema;
