const { Sequelize } = require("sequelize");
const DBSOURCE = "../db.sqlite";
const db = new Sequelize({
  dialect: "sqlite",
  storage: DBSOURCE,
});

const connect = async () => {
  await db.authenticate();
  await db.sync({ force: true });
};

module.exports = connect;
