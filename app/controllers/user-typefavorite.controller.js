const TypeFavo = require("../models/user-typefavorite.model");
const Type = require("../models/typefilm.model");
const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
exports.read = (req, res) => {
    TypeFavo.find()
        .then(idtype_iduser => {
            res.send(idtype_iduser);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving typeFavorites."
            });
        });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.idtype || !req.body.iduser) {
        return res.status(400).send({
            message: "Data can not be empty"
        });
    }

    if (!ObjectId.isValid(req.body.idtype) || !ObjectId.isValid(req.body.iduser)) {
        return res.status(400).send({
            message: "Id not valid"
        });
    }

    Type.findById({ _id: req.body.idtype })
        .then(type => {
            User.findById({ _id: req.body.iduser })
                .then(user => {
                    const typefavo = new TypeFavo({
                        idtype: type._id,
                        iduser: user._id
                    })

                    typefavo.save()
                        .then(data => res.send(data))
                        .catch(err => res.status(500).send({
                            message: err.message || "Some error occurred while creating the typefavo."
                        }))
                })
                .catch(err => res.status(500).send({
                    message: err.message + ", Id not exist in type table."
                }))
        })
        .catch(err =>
            res.status(500).send({
                message: err.message + ", Id not exist in type table."
            })
        );
};