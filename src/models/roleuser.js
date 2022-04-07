'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleUser.hasMany(models.User,{
        as:'users',
        foreignKey:'roleId',
      });
    }
  };
  RoleUser.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RoleUser',
  });
  return RoleUser;
};