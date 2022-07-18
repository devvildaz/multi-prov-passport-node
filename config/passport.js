require('dotenv').config();
const passport = require("passport");
const JWTstrategy = require('passport-jwt').Strategy;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: (req) => {
        let token = null;
        if(req && req.cookies) 
        {
          token = req.cookies['jwt'];
        }
        return token;
      }
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
);

// passport.serializeUser((user, cb) => {
//   console.log('serializeUser');
//   console.log(user);
//   cb(null, user);
// })

// passport.deserializeUser((user, cb) => {
//   console.log('deser')
//   cb(null, user)
// })

module.exports = passport;