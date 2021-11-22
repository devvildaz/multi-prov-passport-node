const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const { hashPassword } = require('../utils/passportUtils');

const User = db.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salt: DataTypes.STRING,
}, {
	hooks: {
		beforeCreate: (user, options) => {
			let [salt, pass] = hashPassword(user.password);
			
			user.setDataValue('password', pass);
			user.setDataValue('salt', salt);
		}
	}
});



// `sequelize.define` also returns the model
module.exports = User;
