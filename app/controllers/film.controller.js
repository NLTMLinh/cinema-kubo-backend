const Film = require("../models/film.model");
const Img = require("../models/img-film.model");
const imageUploader = require("imgur-uploader");
require("express-fileupload");

exports.read = (req, res) => {
    Film.find()
        .then(film => {
            res.send(film);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.create = (req, res) => {
    // Validate request
    // if (!req.files) {
    //     return res.status(400).send({
    //         message: "File was not found"
    //     });
    // }

    // let img = req.files.img;
    let img = req.body.img;
    if (!img.match(".(jpg|jpeg|png|gif)")) {
        return res.status(400).send({
            message: "Image not format"
        });
    }
    if (!req.body.name || !req.body.type ||
        !req.body.releaseDate || !req.body.duration || !req.body.director ||
        !req.body.actors || !req.body.price) {
        return res.status(400).send({
            message: "Data can not be empty"
        });
    }
    imageUploader(img)
        .then(img => {
            const film = new Film({
                name: req.body.name,
                description: req.body.description || "",
                type: req.body.type,
                releaseDate: req.body.releaseDate,
                duration: req.body.duration,
                director: req.body.director,
                actors: req.body.actors,
                language: req.body.language || "",
                age: req.body.age || 10,
                price: req.body.price,
                isActive: req.body.isActive,
                rate: req.body.rate,
                point: req.body.point,
                img: img.link
            });

            film
                .save()
                .then(data => {
                    const img = new Img({
                        idfilm: data._id,
                        name: data.img
                    });
                    img.save().catch(err =>
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Note."
                        })
                    );
                    res.send({ data, img });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note."
                    });
                });
        })
        .catch(err =>
            res.status(400).send({
                message: "Error occured while load image"
            })
        );
};