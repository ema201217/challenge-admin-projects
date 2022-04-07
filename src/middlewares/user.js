const { check, body } = require("express-validator");
const {
  ROLE_PROJECT_MANAGER,
  ROLE_DEVELOPER,
  ROLE_ADMIN,
  ROLE_USER,
} = require("../constants/constants");
const { existUsername, existEmail, isImageValid } = require("../helpers");

const validationCreateUser = [
  body("username")
    .optional({ nullable: true })
    .isString()
    .withMessage("The value should be type string")
    .bail()
    .custom(existUsername),
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .bail()
    .isEmail()
    .withMessage("Email must be like:email@gmail.com")
    .bail()
    .custom(existEmail),
  check("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,25}$/
    )
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ),
  check("roleId")
    .optional({ nullable: true })
    .isString()
    .withMessage("The value should be type string")
    .bail()
    .isIn([ROLE_ADMIN, ROLE_USER])
    .withMessage(`The value should be ${ROLE_ADMIN} or ${ROLE_USER}`),
  check("roleProject")
    .optional({ nullable: true })
    .isString()
    .withMessage("The value should be type string")
    .bail()
    .isIn([ROLE_PROJECT_MANAGER, ROLE_DEVELOPER])
    .withMessage(
      `The value should be ${ROLE_PROJECT_MANAGER} or ${ROLE_DEVELOPER}`
    ),
  body("avatar").custom((_, { req }) => isImageValid(req, "avatar")),
];

const validationUpdateUser = [
  body("username")
    .optional({ nullable: true })
    .if(check("username").exists())
    .isString()
    .withMessage("The value should be type string"),
  check("password")
    .optional({ nullable: true })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,25}$/
    )
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ),
  check("roleId")
    .optional({ nullable: true })
    .isString()
    .withMessage("The value should be type string")
    .bail()
    .isIn([ROLE_ADMIN, ROLE_USER])
    .withMessage(`The value should be ${ROLE_ADMIN} or ${ROLE_USER}`),
  check("roleProject")
    .optional({ nullable: true })
    .isString()
    .withMessage("The value should be type string")
    .bail()
    .isIn([ROLE_PROJECT_MANAGER, ROLE_DEVELOPER])
    .withMessage(
      `The value should be ${ROLE_PROJECT_MANAGER} or ${ROLE_DEVELOPER}`
    ),
  body("avatar").custom((_, { req }) => isImageValid(req, "avatar")),
];

const validationLoginUser = [
  check("password").notEmpty().withMessage("Password required").bail(),
  body("password").custom((_, { req }) => {
    const { username, email } = req.body;
    if (!username && !email) {
      throw new Error("Enter the required email or username");
    }
    return true;
  }),
];

module.exports = {
  validationCreateUser,
  validationUpdateUser,
  validationLoginUser,
};
