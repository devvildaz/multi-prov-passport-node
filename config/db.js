const { Sequelize  } = require('sequelize');
const DBSOURCE = "../db.sqlite";
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: DBSOURCE
});

sequelize.authenticate().then((res) => {
	console.log('DB Connnection successful');
}).catch((err)=>{
	console.err('Error with connect database');
});

module.exports = sequelize;
