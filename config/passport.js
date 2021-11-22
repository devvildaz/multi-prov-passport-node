const passport = require("passport");
const { Op } = require("sequelize");
const db = require("./db");
const User = require("../models/User");
const { validPassword } = require("../utils/passportUtils");
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const validate = validPassword(user.password, password, user.salt );

      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
);
