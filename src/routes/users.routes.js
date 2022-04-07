const router = require("express").Router();

const { list, update, remove } = require("../controllers/user.controller");

const { verifyToken } = require("../middlewares");

router
  .get("/", verifyToken, list)

  .patch("/:id", verifyToken, update)

  .delete("/:id", verifyToken, remove);

module.exports = router;
