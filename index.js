const express = require('express');
require('./config/db')();
const session = require('express-session');
const router = require('./routes/router');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'keyboard cat' }));

app.use('/', router);

app.listen(4000, () => {
	
});

module.exports = app;
