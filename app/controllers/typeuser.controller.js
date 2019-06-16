const TypeUser = require('../models/typeuser.model');
const Const = require('../../constants');
const ObjectId = require('mongoose').Types.ObjectId;

exports.read = (req, res) => {
	TypeUser.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving notes.'
			});
		});
};

//input query: id type
exports.getOne = async (req, res) => {
	const id = req.query.id;
	await TypeFilm.findById(id, (err, result) => {
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

exports.create = (req, res) => {
	console.log('req type user : ', req.body.name);

	// Validate request
	if (req.body.name || req.body.minscore) {
		// Create a Note
		const typeUser = new TypeUser({
			name: req.body.name,
			minscore: req.body.minscore
		});

		// Save Note in the database
		typeUser
			.save()
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Some error occurred while creating the Note.'
				});
			});
	} else {
		return res.status(400).send({
			message: 'type name and minscore can not be empty'
		});
	}
};

//input query: id type
exports.update = (req, res) => {
	const id = ObjectId(req.query.id);

	// Validate request
	if (req.body.name !== undefined || req.body.minscore != undefined) {
		TypeUser.updateOne(
			{ _id: id },
			{
				name: req.body.name,
				minscore: req.body.minscore
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
	} else {
		return res.status(400).send({
			message: 'type name and minscore can not be empty'
		});
	}
};

//input query: id type
exports.delete = async (req, res) => {
	const id = ObjectId(req.query.id);
	if (id === Const.DEFAULT_TYPE_USER_ID) {
		return res.status(Const.ERROR_CODE).send({
			message: 'Cannot delete this type user'
		});
	} else {
		TypeUser.deleteOne({ _id: id }, (err, result) => {
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
	}
};
