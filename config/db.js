const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message);
		throw err;
	} else {
		console.log('SQLITE Database Connected');

		// initialize user table
		console.log('USER DROPPING...');
		db.run(`DROP TABLE IF EXISTS USER`);
		console.log('USER CREATING...');
		db.run(`
			CREATE TABLE USER(
			id integer PRIMARY KEY AUTOINCREMENT,
			username text UNIQUE,
			password text
		)`);

	}
});

function findUser({ username }) {
	let response = null;
	db.get(`SELECT * FROM USER WHERE username = ?`, [username], 
		(err, row) => {
			if(err) { return console.error(err.message);  } 
			response = {};
			response.id = row.id;
			response.username = username;
			response.hashPassword = row.password;
		}
	);

	return response;
}

module.exports = {
	findUser
};
