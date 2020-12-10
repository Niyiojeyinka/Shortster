const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const defaultRoutes = require("./routes/defaultRoute");
const path = require("path");
const db = require("./models");
const useCor = require("./middlewares/cors");

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync with { force: true }");
});
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", useCor, defaultRoutes);

module.exports = app;
