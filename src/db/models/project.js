"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsToMany(models.User, {
        through: "user_projects",
        as: "users",
        foreignKey: "projectId",
        otherKey: "userId",
      });
    }
  }
  Project.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Project",
      paranoid: true,
    }
  );
  return Project;
};
