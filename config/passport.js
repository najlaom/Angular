const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Admin = require('../model/admin_model');

module.exports = function (passport) {
    let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{

    Admin.findById(jwt_payload.use._id, (err, admin) => {
        if(err) {
            return done(err, false);
        }
        if(admin) {
            return done(null, admin);
        }

    });
}));



}