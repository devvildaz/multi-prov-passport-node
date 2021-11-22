const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const passport = require('passport');
require('../config/passport');
const User = require('../models/User');
const { validPassword, issueJWT } = require('../utils/passportUtils');

router.use(passport.initialize());
router.post('/register/local/', async (req,res) => {
	let reg = req.body;

	try {
		let user = await User.create(reg); 
		return res.json(user);
	}
	catch (err){
		res.statusMessage = 'User already exists';
		return res.status(400).end();
	}
});

router.post('/login/local', async function(req,res,next) {
	let user = await User.findOne({
		where: {
			username:  req.body.username
		}
	});

	if(!user) {
		return res.status(401).json({ success: false, msg: 'User doesnt exist' });
	}

	const isValid = validPassword(user.password, req.body.password, user.salt);
	if(!isValid){
		return res.status(401).json({ success: false, msg: 'Incorrect password'});
	} else {
		const tokenObj = issueJWT(user.id);
		return res.status(200).json({ success: true, token : tokenObj.token, expiresIn: tokenObj.expires }); 
	}

});

module.exports = router; 
