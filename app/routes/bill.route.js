module.exports = app => {
  const bill = require("../controllers/bill.controller");

  app.get("/bill/single", bill.getOne);
  app.get("/bill", bill.read);
  app.post("/bill", bill.create);
  // app.put("/bill", bill.update);
};
