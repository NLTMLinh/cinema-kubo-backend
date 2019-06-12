module.exports = app => {
    const typefilm = require("../controllers/typefilm.controller");

    app.get("/typefilm", typefilm.read);
    app.post("/typefilm", typefilm.create);
};