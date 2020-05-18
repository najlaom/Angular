const mongoose = require('mongoose');

const schema = mongoose.Schema;
const multilanguageSchema = schema({
      ar:{
        type: String,
        //required: true
      },
      en:{
        type: String,
       // required: true
      },
      fr:{
        type: String,
       // required: true
      },
      esp:{
          
        type: String,
       // required : true
      }
}, {_id :  false }); 

module.exports =  multilanguageSchema;