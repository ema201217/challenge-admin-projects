const db = require("../db/models");

const existUsername = async (username) => {
  const existUser = await db.User.findOne({
    where: { username },
  });

  if (existUser)
    throw new Error("This username has already been registered");
  
};
const existEmail = async (email) => {
  const existUser = await db.User.findOne({
    where: { email },
  });
  if (existUser)
    throw new Error("This email has already been registered");
};

const existProject = async (name) => {
  const existProject = await db.Project.findOne({
    where: { name },
  });
  if (existProject)
    throw new Error("This project name has already been registered");
    return true
};

module.exports = {
  existUsername,
  existEmail,
  existProject,
};
