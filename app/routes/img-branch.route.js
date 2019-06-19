module.exports = app => {
  const imgbranch = require("../controllers/img-branch.controller");

  app.get("/img-branch", imgbranch.read);
  app.post("/img-branch", imgbranch.create);
  app.delete("/img-branch", imgbranch.delete)
};
