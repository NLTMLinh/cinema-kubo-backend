module.exports = app => {
    const imgfilm = require("../controllers/img-film.controller");

    app.get("/img-film", imgfilm.read);
    app.post("/img-film", imgfilm.create);
    app.delete("/img-film", imgfilm.delete);
};