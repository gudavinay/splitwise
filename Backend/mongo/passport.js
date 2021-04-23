"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
var kafka = require('./kafka/client');
// const UserProfile = require('./models/user_profile');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts,  (jwt_payload, callback) => {
            console.log(jwt_payload);
            const user_id = jwt_payload._id;
            console.log(user_id);
            // UserProfile.findById(user_id, (err, results) => {
            //     if (err) {
            //         console.log("ERR-----",err);
            //         return callback(err, false);
            //     }
            //     if (results) {
            //         console.log("RESUYLTS----");
            //         callback(null, results);
            //     }
            //     else {
            //         console.log("ELSE-----");
            //         callback(null, false);
            //     }
            // });

             kafka.make_request('auth', user_id, function (err, results) {
                console.log('in result');
                console.log(results);
                if (err) {
                    console.log("err-----",err);
                     callback(null, false);
                } if (results) {
                    console.log("results-----",results);
                     callback(null, results);
                } else {
                    console.log("ELSE-----");
                     callback(null, false);
                }
              });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


