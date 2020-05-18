const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const schema = mongoose.Schema;
const postSchema = schema({
      title:{
        type: String,
        required: true
      },
      description:{
        type: String,
        required: true
      },
      image:{
        type: String,
        required: true
      },
      author:{
        type: Date,
        default: Date.now
      }
}); 
postSchema.plugin(timestamps);
module.exports = mongoose.model('post', postSchema);