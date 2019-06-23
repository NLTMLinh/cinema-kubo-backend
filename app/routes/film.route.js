module.exports = app => {
  const film = require("../controllers/film.controller");

    app.get("/film", film.read);
    app.get("/film/single", film.getOne);
    app.post("/film", film.create);
    app.put("/film", film.update);
    app.delete("/film", film.delete);
    app.get("/film-type", film.getFilmsInType);
};
