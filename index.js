const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./routes/router');
require('./config/db')
	.sync({ force : true }).then((res)=>{
		console.log('database synced');
	}).catch((err) => {
		console.err('error with sync');
	});


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'keyboard cat' }));

app.use('/', router);


app.listen(3000, () => {
	console.log('Server Initialized and Running');
});
