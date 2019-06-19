const Film = require('../models/film.model');
const FilmFavo = require('../models/user-filmfavorite.model');
const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const Const = require('../../constants');

//input query: id user
exports.read = (req, res) => {
    TypeFavo.find({ iduser: req.query.iduser })
        .populate('idfilm')
        .exec((err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving typeFavorites.'
                });
            } else {
                res.send(result);
            }
        })
};

//input query: id user, id film
exports.create = (req, res) => {
    const iduser = ObjectId(req.query.iduser);
    const idfilm = ObjectId(req.query.idfilm);

    // Validate request
    if (!idfilm || !iduser) {
        return res.status(400).send({
            message: 'Data can not be empty'
        });
    }

    if (!ObjectId.isValid(idfilm) || !ObjectId.isValid(iduser)) {
        return res.status(400).send({
            message: 'Id not valid'
        });
    }

    Type.findById({ _id: idfilm })
        .then((type) => {
            User.findById({ _id: iduser })
                .then((user) => {
                    const typefavo = new TypeFavo({
                        idfilm: type._id,
                        iduser: user._id
                    });

                    typefavo.save().then((data) => res.send(data)).catch((err) =>
                        res.status(500).send({
                            message: err.message || 'Some error occurred while creating the typefavo.'
                        })
                    );
                })
                .catch((err) =>
                    res.status(500).send({
                        message: err.message + ', Id not exist in type table.'
                    })
                );
        })
        .catch((err) =>
            res.status(500).send({
                message: err.message + ', Id not exist in type table.'
            })
        );
};

//input query: id user, id type
exports.delete = (req, res) => {
    const iduser = ObjectId(req.query.iduser);
    const idfilm = ObjectId(req.query.idfilm);

    Room.deleteOne({ iduser, idfilm }, (err, result) => {
        if (err) {
            res.status(Const.ERROR_CODE).send({
                message: 'Some thing wrong'
            });
        } else {
            res.status(Const.SUCCESS_CODE).send({
                result
            });
        }
    });
};
