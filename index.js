const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { findUser } = require('./utils/passportUtils');

const app = express();

app.use(express.json());
app.use(session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
	return res.send('Hello World');
});

app.listen(3000, () => {
	console.log('Server Initialized and Running');
});
