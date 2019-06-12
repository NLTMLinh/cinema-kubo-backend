const TypeFilm = require("../models/typefilm.model");

exports.read = (req, res) => {
    TypeFilm.find()
        .then(typefilms => {
            res.send(typefilms);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "type name can not be empty"
        });
    }

    // Create a Note
    const typefilm = new TypeFilm({
        name: req.body.name
    });

    // Save Note in the database
    typefilm
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};