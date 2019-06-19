module.exports = app => {
    const typefilm = require("../controllers/typefilm.controller");

    app.get("/typefilm", typefilm.read);
    app.get("/typefilm/single", typefilm.getOne);
    app.post("/typefilm", typefilm.create);
    app.put("/typefilm", typefilm.update);
    app.delete("/typefilm", typefilm.delete);
};