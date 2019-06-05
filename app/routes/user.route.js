module.exports = app => {
  const user = require("../controllers/user.controller");

  app.get("/user", user.read);
  app.post("/user", user.create);
};
