const router = require("express").Router();

const {
  register,
  login,
  getUserAuthenticated,
} = require("../controllers/auth.controller");
const {
  verifyToken,
  validateErrors,
  validationCreateUser,
  validationLoginUser,
} = require("../middlewares");

router
  .get("/me", verifyToken, getUserAuthenticated)

  .post(
    "/register",
    validationCreateUser,
    validateErrors,
    register
  )

  .post("/login",
    validationLoginUser,
    validateErrors,
    login);

module.exports = router;
