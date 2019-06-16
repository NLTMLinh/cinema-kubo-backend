const TypeFilm = require('../models/typefilm.model');
const Film = require('../models/film.model');
const Const = require('../../constants');

exports.read = (req, res) => {
	TypeFilm.find()
		.then((typefilms) => {
			res.send(typefilms);
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
	// Validate request
	if (!req.body.name) {
		return res.status(400).send({
			message: 'type name can not be empty'
		});
	}

	// Create a Note
	const typefilm = new TypeFilm({
		name: req.body.name
	});

	// Save Note in the database
	typefilm
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Note.'
			});
		});
};

//input query: id type
exports.update = (req, res) => {
	const id = ObjectId(req.query.id);

	TypeFilm.updateOne(
		{ _id: id },
		{
			sumseat: req.body.name
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

//input query: id type
exports.delete = async (req, res) => {
	const id = ObjectId(req.query.id);
	//check
	const filmQuantity = await Film.find({}).countDocuments;
	if (filmQuantity > 0) {
		res.status(Const.ERROR_CODE).send({
			message: `Cannot delete this type because of 'type' attribute in Film model`
		});
	} else {
		TypeFilm.deleteOne({ _id: id }, (err, result) => {
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
