module.exports = app => {
  const typepayment = require("../controllers/type-payment.controller");

  app.get("/typepayment", typepayment.get);
  app.get("/typepayment/single", typepayment.getOne);
};
