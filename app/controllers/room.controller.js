const Room = require('../models/room.model');
const ObjectId = require('mongoose').Types.ObjectId;
const Const = require('../../constants');
exports.read = (req, res) => {
	Room.find().then((room) => res.send(room)).catch((err) =>
		res.status(Const.ERROR_CODE).send({
			message: 'Some error occured while retrieving rooms'
		})
	);
};

//input query: id room
exports.getOne = async (req, res) => {
	const id = req.query.id;
	await Room.findById(id, (err, result) => {
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

//input query: idbranch
exports.create = async (req, res) => {
	const idbranch = req.query.idbranch;
	if (!ObjectId.isValid(idbranch)) {
		return res.status(400).send({
			message: 'Id not valid'
		});
	}
	//check name is existed
	await Room.findOne({ nameRoom: req.body.nameRoom || '' }, (err, result) => {
		if (err || result) {
			res.send({
				message: err || "Name room is existed",
				isSuccess: false
			})
		} else {
			const room = new Room({
				idbranch: idbranch,
				sumseat: req.body.sumseat,
				status: true,
				nameRoom: req.body.nameRoom
			});

			room.save().then((room) => res.send(room)).catch((err) =>
				res.status(Const.ERROR_CODE).send({
					message: err.message + 'Some error occured while create a comment'
				})
			);
		}
	})
};

//input query: idroom
exports.update = (req, res) => {
	const idroom = ObjectId(req.query.id);
	// console.log('id: ', idbranch, '- ', req.body.sumseat);
	if (!ObjectId.isValid(idroom)) {
		return res.status(400).send({
			message: 'Id not valid'
		});
	}
	Room.updateOne(
		{ _id: idroom },
		{
			sumseat: req.body.sumseat,
			nameRoom: req.body.nameRoom
		},
		(err, result) => {
			if (err) {
				res.status(Const.ERROR_CODE).send({
					message: 'Some thing wrong'
				});
			} else {
				res.status(Const.SUCCESS_CODE).send({
					result
				});
			}
		}
	);
};

//input query: idroom
exports.delete = (req, res) => {
	const idroom = ObjectId(req.query.id);
	if (!ObjectId.isValid(idroom)) {
		return res.status(400).send({
			message: 'Id not valid'
		});
	}
	Room.deleteOne({ _id: idroom }, (err, result) => {
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
