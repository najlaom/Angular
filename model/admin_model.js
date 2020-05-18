const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema({

    username: {
        type: String ,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    email: {
        type: String ,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type: String ,
        required: true,
        max: 255,
        min: 6
        
    },
    creation_dt:{
        type: Date,
        require:true
    } 
});
adminSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password, 10);
}

adminSchema.methods.isValid = function(hashPassword){
    return bcrypt.compareSync(hashPassword, this.password);
}
module.exports = mongoose.model('admin', adminSchema);
