const express = require("express");
const app = express();
const logger = require("morgan");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const port = process.env.PORT || 3000;

// Documentation Swagger Interface
const { serve, setup } = require("swagger-ui-express");
const { configSwagger } = require("./src/documentation/config.swagger");
const swaggerJSDocs = require("swagger-jsdoc")(configSwagger);

// routers
const authRouter = require("./src/routes/auth.routes");
const usersRouter = require("./src/routes/users.routes");
const projectsRouter = require("./src/routes/projects.routes");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

// routes

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/api/docs", serve, setup(swaggerJSDocs));
app.use("/*", (req, res) => {
  res.status(404).json({ ok: false, msg: "Page not found" });
});

app.listen(port);

module.exports = app;
