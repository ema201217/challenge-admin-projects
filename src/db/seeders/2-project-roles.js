"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "role_projects",
      [
        {
          name: "project manager",
          description:
            "He is responsible for leading and managing the project to achieve the expected results in a timely manner.",
        },
        {
          name: "developer",
          description:
            "Design, produce or maintain software components or subassemblies.",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("role_projects", null, {});
  },
};
