const db = require("./config/db");
const {describe, expect, test} = require('@jest/globals') 
const supertest = require('supertest');
const app = require("./index");
const User = require("./models/User");

console.log(expect);

beforeEach((done) => {
	db.sync({ force: true }).then(() => {
		done();
	});
});

afterEach((done) => {
	db.sync({ force: true }).then(() => {
		return db.drop();
	}).then(() => {
		done();
	});
});

describe('Pruebas unitarias', () => {
	test('POST /register/local', async () => {
		let response = await supertest(app)
			.post("/register/local")
			.send({ username: 'dvilca', password: 'pass' });
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(expect.objectContaining({
			username: 'dvilca',
			id: expect.any(Number),
			success: true
		}))
	});

	test('POST /register/local (User already exists)', async () => {
		await User.create({ username: 'dvilca', password: 'pass' });
		let response = await supertest(app)
			.post("/register/local")
			.send({ username: 'dvilca', password: 'pass' });
		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual(expect.objectContaining({
			message: expect.any(String),
			success: false 
		}))
	});

	test('POST /login/local', async () => {
		await User.create({ username: 'rodriguez', password: '1234' });
		let response = await supertest(app)
			.post("/login/local")
			.send({ username: 'rodriguez', password: '1234' });
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(expect.objectContaining({
			success: true, 
			token: expect.any(String)
		}))
	});

	test('POST /login/local Wrong Password ', async () => {
		await User.create({ username: 'rodriguez', password: '1234' });
		let response = await supertest(app)
			.post("/login/local")
			.send({ username: 'rodriguez', password: '12345' });
		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual(expect.objectContaining({
			message: expect.any(String),
			success: false 
		}))
	});

	test('POST /login/local User not founded', async () => {
		let response = await supertest(app)
			.post("/login/local")
			.send({ username: 'rodriguez', password: '1234' });
		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual(expect.objectContaining({
			message: expect.any(String),
			success: false 
		}))
	});
});
