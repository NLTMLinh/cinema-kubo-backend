module.exports = app => {
  const film = require("../controllers/film.controller");

  app.get("/film", film.read);
  app.post("/film", film.create);
  app.put("/film", film.update);
  app.delete("/film", film.delete);
  app.get("/film/get-film-by-type", film.getFilmsInType);
};
