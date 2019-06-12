module.exports = app => {
    const roomController = require("../controllers/room.controller");

    app.get("/room", roomController.read);
    app.post("/room", roomController.create);
};