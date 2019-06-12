const ImgFilm = require("../models/img-film.model");
const Film = require("../models/film.model");
const ObjectId = require("mongoose").Types.ObjectId;
exports.read = (req, res) => {
    ImgFilm.find()
        .then(imgfilm => {
            res.send(imgfilm);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.idfilm || !req.body.name) {
        return res.status(400).send({
            message: "Data can not be empty"
        });
    }

    if (!ObjectId.isValid(req.body.idfilm)) {
        return res.status(400).send({
            message: "Id not valid"
        });
    }
    // kiểm tra xem có id trong bản chi nhánh chưa, nếu có thì tạo img vào bảng img-branh

    Film.findById({ _id: req.body.idfilm })
        .then(film => {
            const imgfilm = new ImgFilm({
                idfilm: film._id,
                name: req.body.name
            });
            imgfilm
                .save()
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note."
                    });
                });
        })
        .catch(err =>
            res.status(500).send({
                message: err.message + ", Id not exist in branch table."
            })
        );
};