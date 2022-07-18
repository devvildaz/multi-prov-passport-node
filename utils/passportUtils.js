require('dotenv').config();
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const dayjs = require('dayjs');

exports.hashPassword = (password) => {;
	let hash = crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, 'sha512').toString('hex');
	return hash;
}

exports.validPassword = (pass0, pass1, salt) => {
	let hash2 = crypto.pbkdf2Sync(pass1, process.env.SALT, 1000, 64, 'sha512').toString('hex');
	return pass0 === hash2;
}


exports.issueJWT = (user) => {
	const payload = {
		id: user.id,
	};
	const signedToken = jsonwebtoken
		.sign(payload, process.env.SECRET, { expiresIn: '1d' });
	return signedToken;
}
