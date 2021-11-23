const { Sequelize } = require("sequelize");
const DBSOURCE = "../db.sqlite";
const db = new Sequelize({
  dialect: "sqlite",
  storage: DBSOURCE,
});

db.authenticate();

module.exports = db;
