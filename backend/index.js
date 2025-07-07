require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { sequelize } = require("./models");
const { runMigrations } = require("./config/umzug");
const weatherRoutes = require("./routes/weatherRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const { startSchedulers } = require("./scheduler/scheduler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", [weatherRoutes, subscriptionRoutes]);

const start = async () => {
  try {
    await sequelize.authenticate();

    await runMigrations();

    startSchedulers();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log("Error: ", error);
  }
};

start();
