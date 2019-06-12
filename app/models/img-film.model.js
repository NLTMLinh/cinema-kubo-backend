const mongoose = require("mongoose");

const ImgFilmSchema = mongoose.Schema({
    idfilm: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    name: String
})

module.exports = mongoose.model("ImgFilm", ImgFilmSchema)