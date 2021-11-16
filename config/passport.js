const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const User = connection.models.User;

passport.use(new LocalStrategy(
	(username, password, done) => {
		let res = db.findUser({ username });
		if(!res) { return done(null, false)  }
	}
));
