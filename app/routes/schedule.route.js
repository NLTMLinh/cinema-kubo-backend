module.exports = app => {
  const schedule = require("../controllers/schedule.controller");

  app.get("/schedule", schedule.read);
  app.get("/schedule/single", schedule.getOne);
  app.post("/schedule", schedule.create);
};
