module.exports = app => {
  const user = require("../controllers/user.controller");

  app.get("/user", user.getOne);
  app.get("/user/all", user.read);
  app.post("/user", user.create);
  app.post("/user", user.update);
};
