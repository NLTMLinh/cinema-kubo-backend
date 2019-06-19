const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;

const UserFilmFavoSchema = mongoose.Schema({
    iduser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    idfilm: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Film'
    }
});

module.exports = mongoose.model("FilmFavorite", UserFilmFavoSchema);
