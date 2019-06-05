const express = require("express");
const bodyPaser = require("body-parser");
const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());
app.use(logger("dev"));

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

require("./app/routes/categoryfilm.route.js")(app);
require("./app/routes/user.route")(app);
require("./app/routes/branch.route")(app);
require("./app/routes/img-branch.route")(app);

app.get("/", (req, res) => {
  res.json({ message: "Simple app" });
});

app.listen(4500, () => {
  console.log("Server is listening port 4500!!!");
});
