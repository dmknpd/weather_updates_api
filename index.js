require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { sequelize } = require("./models");
const { runMigrations } = require("./config/umzug");
const weatherRoutes = require("./routes/weatherRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const { startSchedulers } = require("./scheduler/scheduler");

const app = express();
const PORT = process.env.PORT || 7000;

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
