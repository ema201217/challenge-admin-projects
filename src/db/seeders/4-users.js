"use strict";
const { ROLE_ADMIN, ROLE_USER, ROLE_DEVELOPER, ROLE_PROJECT_MANAGER } = require("../../constants/constants");
const bcrypt = require("bcryptjs");

const configUsers = [
  {
    roleId: ROLE_ADMIN,
    type: "admin",
    quantity: 1,
    roleProject:ROLE_PROJECT_MANAGER
  },
  {
    roleId: ROLE_USER,
    type: "user",
    quantity: 30,
    roleProject:ROLE_DEVELOPER
  },
];

 const createUsers = async (configUsers) => {
  let users = [];
  try {
    for (let item of configUsers) {
      for (let i = 1; i <= item.quantity; i++) {
        users = [
          ...users,
          {
            email: `${item.type}${i}@test.com`,
            password: await bcrypt.hash(`${item.type}${i}`, 10),
            username: `${item.type}-${i}`,
            roleId: item.roleId,
            roleProject: item.roleProject,
            avatar:"https://www.seekpng.com/png/full/428-4287240_no-avatar-user-circle-icon-png.png",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
    }
    return users;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const users = await createUsers(configUsers);
      await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
