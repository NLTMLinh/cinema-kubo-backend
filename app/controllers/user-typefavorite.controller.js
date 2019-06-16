const TypeFavo = require('../models/user-typefavorite.model');
const Type = require('../models/typefilm.model');
const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const Const = require('../../constants');

exports.read = (req, res) => {
	TypeFavo.find()
		.then((idtype_iduser) => {
			res.send(idtype_iduser);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving typeFavorites.'
			});
		});
};

//input query: id user, id type
exports.create = (req, res) => {
	const iduser = ObjectId(req.query.iduser);
	const idtype = ObjectId(req.query.idtype);

	// Validate request
	if (!idtype || !iduser) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}

	if (!ObjectId.isValid(idtype) || !ObjectId.isValid(iduser)) {
		return res.status(400).send({
			message: 'Id not valid'
		});
	}

	Type.findById({ _id: idtype })
		.then((type) => {
			User.findById({ _id: iduser })
				.then((user) => {
					const typefavo = new TypeFavo({
						idtype: type._id,
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
	const idtype = ObjectId(req.query.idtype);

	Room.deleteOne({ iduser, idtype }, (err, result) => {
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
