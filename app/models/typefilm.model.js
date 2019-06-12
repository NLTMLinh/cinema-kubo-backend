const mongoose = require("mongoose");

const TypeFilmSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model("TypeFilm", TypeFilmSchema);