"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const UserProfile = require('./models/user_profile');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            console.log(user_id, jwt_payload);
            UserProfile.findById(user_id, (err, results) => {
                if (err) {
                    console.log("JWT ERR");
                    return callback(err, false);
                }
                if (results) {
                    console.log("JWT RESULTS");
                    callback(null, results);
                }
                else {
                    console.log("JWT ELSE");
                    callback(null, false);
                }
            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


