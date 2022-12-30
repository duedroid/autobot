const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const commonMiddlewares = require("./middlewares/common");
const api = require("./api");

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {}, () => {
  console.log("Connected to MongoDB");
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

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
