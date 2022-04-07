const router = require("express").Router();

const {
  register,
  login,
  getUserAuthenticated,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares");

router
  .get("/me", verifyToken, getUserAuthenticated)

  .post("/register", register)

  .post("/login", login);

module.exports = router;
