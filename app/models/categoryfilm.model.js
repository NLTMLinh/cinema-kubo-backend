const mongoose = require("mongoose");

const CategoryFilmSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model("CategoryFilm", CategoryFilmSchema);
