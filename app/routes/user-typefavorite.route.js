module.exports = app => {
    const typeFavo = require("../controllers/user-typefavorite.controller");

    app.get("/type-favo", typeFavo.read);
    app.post("/type-favo", typeFavo.create);
};