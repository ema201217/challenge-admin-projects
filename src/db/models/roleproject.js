'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleProject.hasMany(models.User,{
        as:'users',
        foreignKey:'roleProject',
      });
    }
  };
  RoleProject.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RoleProject',
    tableName: 'role_projects',
    timestamps:false,
  });
  return RoleProject;
};