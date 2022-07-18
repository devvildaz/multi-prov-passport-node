'use strict';
const {
  Model
} = require('sequelize');
const utils = require('../utils/passportUtils');

module.exports = (sequelize, DataTypes) => {
  class AppUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AppUser.init({
    name: DataTypes.STRING,
    issuer: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AppUser',
  });

  AppUser.addHook('beforeCreate', (model, options) => {
    model.id = require('uuid').v4();
    model.password = utils.hashPassword(model.password);
  });
  return AppUser;
};