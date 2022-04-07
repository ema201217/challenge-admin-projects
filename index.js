const express = require("express");
const app = express();
const logger = require("morgan");

const port = process.env.PORT || 3000;

// Documentation Swagger Interface
const { serve, setup } = require("swagger-ui-express");
const { configSwagger } = require("./src/documentation/config.swagger");
const swaggerJSDocs = require("swagger-jsdoc")(configSwagger); // eslint-disable-line

// routers
/* const testimonialsRouter = require("./src/routes/testimony.routes");
const commentsRouter = require("./src/routes/comments.routes"); */

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/docs", serve, setup(swaggerJSDocs));
/* app.use("/testimonials", testimonialsRouter);
app.use("/comments", commentsRouter); */
app.use("/*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(port);

module.exports = app;
