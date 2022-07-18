const express = require('express');
// const session = require('express-session');
const router = require('./routes/router');
const db = require('./models/index');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


app.use('/', router);

db.sequelize.authenticate()
	.then(() => {
		app.listen(3000, () => {
			console.log('Listening to 3000');	
		});
	})
	.catch((err) => {
		console.error(err);
	});
