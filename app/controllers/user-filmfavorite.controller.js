const Film = require('../models/film.model');
const FilmFavo = require('../models/user-filmfavorite.model');
const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const Const = require('../../constants');

//input query: id user
exports.read = (req, res) => {
    const iduser = req.query.iduser;
    console.log("iduser: ", iduser);
    FilmFavo.find({ iduser })
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
exports.create = async (req, res) => {
    const iduser = ObjectId(req.query.iduser);
    const idfilm = ObjectId(req.query.idfilm);

    // Validate request
    if (!idfilm || !iduser) {
        return res.status(400).send({
            message: 'Data can not be empty'
        });
    }
    const isExist = await FilmFavo.findOne({ iduser, idfilm }).countDocuments();
    // console.log("count: ", isExist);
    if (isExist > 0) {
        return res.send({
            message: "data is exist"
        })
    }

    Film.findById({ _id: idfilm })
        .then((type) => {
            User.findById({ _id: iduser })
                .then((user) => {
                    const typefavo = new FilmFavo({
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
