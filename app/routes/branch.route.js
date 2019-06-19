module.exports = app => {
  const branch = require("../controllers/branch.controller");

  app.get("/branch", branch.read);
  app.get("/branch/single", branch.getOne);
  app.post("/branch", branch.create);
};
