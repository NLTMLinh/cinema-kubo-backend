module.exports = app => {
  const categoryfilms = require("../controllers/categoryfilm.controller");

  app.get("/categoryfilms", categoryfilms.read);
  app.post("/categoryfilms", categoryfilms.create);
};
