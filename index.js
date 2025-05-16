require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", [weatherRoutes, subscriptionRoutes]);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log("Error: ", error);
  }
};

start();
