const BranchFavo = require('../models/user-branchfavorite.model');
const Branch = require('../models/branch.model');
const User = require('../models/user.model');
const Const = require('../../constants');
const ObjectId = require('mongoose').Types.ObjectId;

//input query: iduser
exports.read = (req, res) => {
	BranchFavo.find({ iduser: req.query.iduser })
		.populate('idbranch')
		.exec((err, result) => {
			if (err) {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving typeFavorites.'
				});
			} else {
				res.send(result);
			}
		})
	// .then((idbranch_iduser) => {
	// 	res.send(idbranch_iduser);
	// })
	// .catch((err) => {
	// 	res.status(500).send({
	// 		message: err.message || 'Some error occurred while retrieving notes.'
	// 	});
	// });
};

//input query: idbranch, iduser
exports.create = (req, res) => {
	const iduser = ObjectId(req.query.iduser);
	const idbranch = ObjectId(req.query.idbranch);
	// Validate request
	if (!branch || !req.query.iduser) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}
	//check is it exist
	const temp = Branch.find({ iduser, idbranch });
	if (temp) {
		res.status(500).send({
			message: 'Data existed'
		});
	} else {
		Branch.findById({ _id: idbranch })
			.then((branch) => {
				User.findById({ _id: iduser })
					.then((user) => {
						const branchfavo = new BranchFavo({
							idbranch: branch._id,
							iduser: user._id
						});

						branchfavo.save().then((data) => res.send(data)).catch((err) =>
							res.status(500).send({
								message: err.message || 'Some error occurred while creating the Note.'
							})
						);
					})
					.catch((err) =>
						res.status(500).send({
							message: err.message + ', Id not exist in branch table.'
						})
					);
			})
			.catch((err) =>
				res.status(500).send({
					message: err.message + ', Id not exist in branch table.'
				})
			);
	}
};

//input query: iduser, idbranch
exports.delete = (req, res) => {
	const iduser = ObjectId(req.query.iduser);
	const idbranch = ObjectId(req.query.idbranch);

	Room.deleteOne({ iduser, idbranch }, (err, result) => {
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
