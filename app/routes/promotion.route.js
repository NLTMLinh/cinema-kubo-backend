module.exports = app => {
  const promotion = require("../controllers/promotion.controller");

  app.get("/promotion", promotion.read);
  app.get("/promotion/single", promotion.getOne);
  app.get("/promotion/find", promotion.findPromotion);  //input in query: idfilm, (and idtypeuser)
  app.post("/promotion", promotion.create);
};
