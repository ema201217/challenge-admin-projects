const router = require("express").Router();
const {
  list,
  store,
  remove,
  update,
  detail,
} = require("../controllers/project.controller");

const {
  verifyToken,
  checkAdminRole,
  validationCreateProject,
  validateErrors,
  validationUpdateProject,
} = require("../middlewares");

router
  .get("/", /* verifyToken, checkAdminRole */ list)
  .get("/:id", /* verifyToken, checkAdminRole */ detail)
  .post(
    "/",
    /* verifyToken, checkAdminRole */ validationCreateProject,
    validateErrors,
    store
  )

  .delete("/:id", /* verifyToken, checkAdminRole */ remove)

  .patch(
    "/:id",
    /* verifyToken, checkAdminRole */ validationUpdateProject,
    validateErrors,
    update
  );

module.exports = router;
