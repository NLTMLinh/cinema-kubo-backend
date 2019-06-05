module.exports = app => {
  const branch = require("../controllers/branch.controller");

  app.get("/branch", branch.read);
  app.post("/branch", branch.create);
};
