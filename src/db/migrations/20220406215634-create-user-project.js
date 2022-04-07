"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: "projects",
          key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_projects");
  },
};
