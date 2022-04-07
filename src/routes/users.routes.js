const router = require("express").Router();

const { list, update, remove } = require("../controllers/user.controller");

const {
  verifyToken,
  validationUpdateUser,
  validateErrors,
  checkAdminRole,
} = require("../middlewares");

router
  .get("/", /* verifyToken, checkAdminRole, */ list)

  .patch(
    "/:id",
  /*   verifyToken,
    checkAdminRole, */
    validationUpdateUser,
    validateErrors,
    update
  )

  .delete("/:id", /* verifyToken, checkAdminRole, */ remove);

module.exports = router;
