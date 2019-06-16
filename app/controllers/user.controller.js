const User = require('../models/user.model');
const TypeUser = require('../models/typeuser.model');

exports.read = async (req, res) => {
	await User.find({}, (err, users) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving notes.'
			});
		} else {
			TypeUser.find({}, (err, type) => {
				if (err) {
					res.status(Const.ERROR_CODE).send({
						message: 'Some thing wrong'
					});
				} else {
					const result = users.forEach((user) => {
						const typeUser = type.find((item) => item._id == user._doc.typeuser);
						const temp = { ...user._doc, typeUser: typeUser };
						console.log('temp: ', temp);
						return temp;
					});
					console.log('result: ', result);
					res.send(result);
				}
			});
		}
	});
};

//input query: id user
exports.getOne = async (req, res) => {
	const id = req.query.id;
	await User.findById(id, (err, result) => {
		if (err) {
			res.status(Const.ERROR_CODE).send({
				message: 'Some thing wrong'
			});
		} else if (result) {
			const typeId = result.typeuser;
			TypeUser.findById({ typeId }, (err, type) => {
				if (err) {
					res.status(Const.SUCCESS_CODE).send({
						err
					});
				} else {
					res.send({ ...result, type });
				}
			});
		}
	});
};

exports.create = (req, res) => {
	// Validate request
	if (
		!req.body.fullname ||
		!req.body.birthday ||
		!req.body.username ||
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
		username: req.body.username,
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
	if (!req.body.fullname || !req.body.birthday || !req.body.username || !req.body.password || !req.body.phone) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}

	User.update(
		{ _id: id },
		{
			fullname: req.body.fullname,
			birthday: req.body.birthday,
			username: req.body.username,
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
