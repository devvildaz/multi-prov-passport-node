const express = require('express');
const db = require('./config/db');
const session = require('express-session');
const router = require('./routes/router');
db.sync().then((res) => {
	console.log('Database Synced');
})

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'keyboard cat' }));

app.use('/', router);

app.listen(3000, () => {
	console.log('Listening to 3000');	
});

module.exports = app;
