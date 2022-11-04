const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const db = require("../db/db");
const User = require("../models/user");

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken(); // this get's the jwt token from the headers
options.secretOrKey = db.accessSecretToken; // this is the secret token that we encrypt that jwt token

module.exports = (passport) => {
  passport.use(
    new JWTStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user); // true statement
        }
        return done(null, false);
      } catch (err) {
        console.log(err);
      }
    })
  );
};
