const request = require("supertest");
const connectdb = require("./config/db");
const db = require("./config/db");
const supertest = require('supertest');
const app = require("./index");
const User = require("./models/User");

beforeEach((done) => {
	db.sync({ force: true }).then((res) => {
		done();
	});
});

afterEach((done) => {
	db.sync({ force: true }).then(() => {
		done();
	});
});

describe('Pruebas unitarias', () => {
	test('POST /register/local', async () => {
		await supertest(app)
			.post("/register/local")
			.send({ username: 'dvilca', password: 'pass' })
			.expect(200)
			.then((response) => {
				console.log(response)
			});
	});
	test('POST /register/local (User already exists)', async () => {
		await User.create({ username: 'dvilca', password: 'pass' });
		await supertest(app)
			.post("/register/local")
			.send({ username: 'dvilca', password: 'pass' })
			.expect(400)
			.then((response) => {
				console.log(response)
			});
	});

	test('POST /login/local', async () => {
		await User.create({ username: 'rodriguez', password: '1234' });
		await supertest(app)
			.post("/login/local")
			.send({ username: 'rodriguez', password: '1234' })
			.expect(200)
			.then((response) => {
				console.log(response)
			});
	});

	test('POST /login/local Wrong Password ', async () => {
		await User.create({ username: 'rodriguez', password: '1234' });
		await supertest(app)
			.post("/login/local")
			.send({ username: 'rodriguez', password: '12345' })
			.expect(400)
			.then((response) => {
				console.log(response)
			});
	});

	test('POST /login/local User not founded', async () => {
		await supertest(app)
			.post("/login/local")
			.send({ username: 'rodriguez', password: '12345' })
			.expect(400)
			.then((response) => {
				console.log(response)
			});
	});
});
