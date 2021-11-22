const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy, 
	ExtractJwt = require('passport-jwt').ExtractJwt;
const {Op} = require('sequelize');
const db = require('./db');
const User = require('../models/User');
const { validPassword } =require('../utils/passportUtils');

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	algoritms: ['SHA256']
};

passport.use(new JwtStrategy(
	options,
	async (jwt_payload, done) => {
		let user = await User.findOne({
			where: {
				id: jwt_payload.sub
			}
		});

		if(!user) {
			return done(null, false, { message: 'User not founded' });
		}

		return done(null, user);
	}
));
