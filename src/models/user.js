"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Project, {
        through: "user_projects",
        as: "projects",
        foreignKey: "userId",
        otherKey: "projectId",
      });

      User.belongsTo(models.RoleUser, {
        as: "role",
        foreignKey: "roleId",
      });

      User.belongsTo(models.RoleProject, {
        as: "mission",
        foreignKey: "roleProject",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      avatar: DataTypes.STRING,
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
      roleProject: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      paranoid: true,
    }
  );
  return User;
};
