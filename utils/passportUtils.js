const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const PRIV_KEY = fs.readFileSync('~/.ssh/id_rsa', 'utf8');
const PUB_KEY = fs.readFileSync('~/.ssh/id_rsa.pub', 'utf8');

exports.hashPassword = (password) => {
	let salt = crypto.randomBytes(16).toString();
	let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return [salt, hash];
}

exports.validPassword = (pass0, pass1, salt) => {
	let hash2 = crypto.pbkdf2Sync(pass1, salt, 1000, 64, 'sha512').toString('hex');
	return pass0 === hash2;
}


exports.issueJWT = (user) => {
	const id = user.id;
	const expiresIn = '1d';

	const payload = {
		sub: id,
		iat: Date.now()
	}
	
	const signedToken = jsonwebtoken
		.sign(payload, PRIV_KEY, { expiresIn:expiresIn, algorithm: 'SHA256' });
	
	return {
		token: "Bearer "+signedToken,
		expires: expiresIn
	}
}
