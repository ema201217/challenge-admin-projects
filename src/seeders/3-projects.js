"use strict";
const { STATUS_ENABLED } = require("../constants/constants");

const configProject = [
  {
    name: "project",
    description: "description project",
    status:STATUS_ENABLED, // 1 = enabled, 0 = disabled
  }
];

 const createProjects = (configProject) => {
  let projects = [];
  for (let item of configProject) {
    for (let i = 1; i <= 30; i++) {
      projects = [
        ...projects,
        {
          name: `${item.name} ${i}`,
          description:`${item.description} ${i}`,
          status:item.status,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }
  }
  return projects;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const projects = await createProjects(configProject)
    await queryInterface.bulkInsert("projects", projects, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
