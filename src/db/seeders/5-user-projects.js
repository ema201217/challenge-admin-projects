"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 1; i <= 30; i++) {
      await queryInterface.bulkInsert(
        "user_projects",
        [
          {
            userId: Math.floor(Math.random() * (30 - 1) + 1),
            projectId: Math.floor(Math.random() * (30 - 1) + 1),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_projects", null, {});
  },
};
