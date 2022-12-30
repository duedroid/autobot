const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const api = require("./api");
const commonMiddlewares = require("./middlewares/common");
const openapi = require("../openapi.json");

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {}, () => {
  console.log("Connected to MongoDB");
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api", api);

app.use(commonMiddlewares.notFound);
app.use(commonMiddlewares.errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
