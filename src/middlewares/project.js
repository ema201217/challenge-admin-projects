const { check, body } = require("express-validator");
const { STATUS_ENABLED, STATUS_DISABLED } = require("../constants/constants");
const { existProject } = require("../helpers");

const validationCreateProject = [
  body("name")
    .notEmpty()
    .withMessage("Name required")
    .bail()
    .not()
    .isNumeric()
    .withMessage("The value should be type string")
    .bail()
    .isLength({ min: 4, max: 20 })
    .withMessage("Invalid length, min 4 - max 20")
    .custom(existProject),
  check("description")
    .optional({ nullable: true })
    .not()
    .isNumeric()
    .withMessage("The value should be type string")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Invalid length, min 10"),
  check("status")
    .optional({ nullable: true })
    .isIn([STATUS_ENABLED, STATUS_DISABLED])
    .withMessage(`The value should be ${STATUS_ENABLED} or ${STATUS_DISABLED}`),
];

const validationUpdateProject = [
  body("name")
    .optional({ nullable: true })
    .not()
    .isNumeric()
    .withMessage("The value should be type string")
    .bail()
    .isLength({ min: 4, max: 20 })
    .withMessage("Invalid length, min 4 - max 20"),
  check("description")
    .optional({ nullable: true })
    .not()
    .isNumeric()
    .withMessage("The value should be type string")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Invalid length, min 10"),
  check("status")
    .optional({ nullable: true })
    .isIn([STATUS_ENABLED, STATUS_DISABLED])
    .withMessage(`The value should be ${STATUS_ENABLED} or ${STATUS_DISABLED}`),
];

module.exports = { validationCreateProject, validationUpdateProject };
