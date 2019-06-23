const User = require('../models/user.model');

exports.read = (req, res) => {
	User.find({})
		.populate('typeuser').exec((err, result) => {
			if (err) {
				res.status(Const.SUCCESS_CODE).send(err);
			} else {
				res.send(result);
			}
		})
}

//input query: id user
exports.getOne = (req, res) => {
	User.findById(req.query.id)
		.populate('typeuser').exec((err, result) => {
			if (err) {
				res.status(Const.SUCCESS_CODE).send(err);
			} else {
				res.send(result);
			}
		})
}

exports.create = (req, res) => {
	// Validate request
	if (
		!req.body.fullname ||
		!req.body.birthday ||
		!req.body.email ||
		!req.body.password ||
		!req.body.phone
	) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}

	// Create a Note
	const user = new User({
		fullname: req.body.fullname,
		birthday: req.body.birthday,
		email: req.body.email,
		password: req.body.password,
		phone: req.body.phone,
		branchfavo: req.body.branchfavo || '',
		typefavo: req.body.typefavo || ''
	});

	// Save Note in the database
	user
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

// input query: idUser
exports.update = async (req, res) => {
	const id = req.query.id;
	// Validate request
	if (!req.body.fullname || !req.body.birthday || !req.body.password || !req.body.phone) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}

	User.update(
		{ _id: id },
		{
			fullname: req.body.fullname,
			birthday: req.body.birthday,
			phone: req.body.phone
		},
		(err, result) => {
			if (err) {
				res.status(500).send({
					message: 'Some thing wrong'
				});
			} else {
				res.status(200).send({
					result
				});
			}
		}
	);
};

// input query: idUser
exports.delete = async (req, res) => {
	const idUser = req.query.id;
	await User.deleteOne({ _id: idUser }, (err) => {
		if (err) {
			res.send({
				issuccess: false
			})
		} else {
			res.send({
				issuccess: true
			})
		}
	})
}
