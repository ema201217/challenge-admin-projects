const router = require("express").Router();
const {
  list,
  store,
  remove,
  update,
} = require("../controllers/project.controller");

const { verifyToken } = require("../middlewares");

router
  .get("/", verifyToken, list)

  .post("/", verifyToken, store)

  .delete("/:id", verifyToken, remove)

  .put("/:id", verifyToken, update);

module.exports = router;
