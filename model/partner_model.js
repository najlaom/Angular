const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongooseUniqueValidator = require('mongoose-unique-validator');


const schema = mongoose.Schema;
const partnerSchema = schema({
  name: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  managerName: {
    type: String,
    default: true
  },
  email: {
    type: String,
    required: true,
    unique: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role:{
    type: String
  },
  
    status:{
      type: Boolean,
      required: true
    }
  

},{ timestamps: true });
partnerSchema.plugin(mongooseUniqueValidator);

partnerSchema.methods.comparePassword = function (candidatePassword, checkpassword) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return checkpassword(err)
    checkpassword(null, isMatch)
  })
}

module.exports = mongoose.model('partner', partnerSchema);
