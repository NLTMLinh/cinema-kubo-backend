const Room = require("../models/room.model");
const ObjectId = require("mongoose").Types.ObjectId;
exports.read = (req, res) => {
    Room.find()
        .then(room => res.send(room))
        .catch(err =>
            res.status(500).send({
                message: "Some error occured while retrieving rooms"
            })
        );
};

exports.create = (req, res) => {
    if (!ObjectId.isValid(req.body.idbranch)) {
        return res.status(400).send({
            message: "Id not valid"
        });
    }
    const room = new Room({
        idbranch: req.body.idbranch,
        sumseat: req.body.sumseat,
        status: req.body.status
    });

    room
        .save()
        .then(room => res.send(room))
        .catch(err =>
            res.status(500).send({
                message: err.message + "Some error occured while create a comment"
            })
        );
}