const Promotion = require('../models/promotion.model');
const Const = require('../../constants');

exports.read = (req, res) => {
	Promotion.find({ status: true })
		.populate('idTypeUser')
		.populate('idFilm')
		.exec((err, promotion) => {
			if (err) {
				res.send(err);
			} else {
				res.send(promotion);
			}
		})
};
//input in query: id promotion	as id
exports.getOne = (req, res) => {
	const idpromotion = req.query.id || '';
	Promotion.findById(idpromotion)
		.populate('idTypeUser')
		.populate('idFilm').exec((err, promotion) => {
			if (err) {
				res.send(err);
			} else {
				res.send(promotion);
			}
		})
};

//input in query: idfilm, (and idtypeuser)
exports.findPromotion = (req, res) => {
	const idFilm = req.query.idfilm || '';
	const idTypeUser = req.query.idtypeuser || { $ne: null };

	Promotion.find({ idTypeUser, idFilm, status: true })
		.populate('idTypeUser')
		// .populate('idFilm')
		.sort({ discount: -1 })
		.exec((err, promotion) => {
			if (err) {
				res.send(err);
			} else {
				res.send(promotion);
			}
		})
};

exports.create = (req, res) => {
	const name = req.body.name || '';
	const idTypeUser = req.body.idTypeUser || [];
	const startTime = req.body.startTime || Date.now();
	const endTime = req.body.endTime || '';
	const discount = req.body.discount || Const.DEFAULT_PROMOTION;
	const description = req.body.description || '';
	const idFilm = req.body.idFilm || [];

	if (discount <= 0) {
		discount = Const.DEFAULT_PROMOTION;
	} else if (discount > Const.MAX_PROMOTION) {
		discount = Const.MAX_PROMOTION;
	}

	const promotion = new Promotion({
		name, idTypeUser, startTime, endTime, discount, description, idFilm
	});

	promotion.save().then(result => {
		if (!result) {
			res.send({
				message: "Something wrong",
				isSuccess: false
			})
		} else {
			res.send(result);
		}
	})
};

// //input in query: id promotion	as id
// // NOT update img
// exports.update = async (req, res) => {
// 	const idpromotion = req.query.id;
// 	if (!req.body.name || !req.body.address || !req.body.status) {
// 		return res.status(400).send({
// 			message: 'Data can not be empty'
// 		});
// 	}

// 	await Promotion.updateOne({ _id: idpromotion }, {
// 		name: req.body.name,
// 		address: req.body.address
// 	}, (err, result) => {
// 		if (err) {
// 			res.status(400).send({
// 				isSuccess: false
// 			})
// 		} else {
// 			res.status(200).send({
// 				isSuccess: true,
// 				result
// 			})
// 		}
// 	})
// };
// //input query: id promotion as id
// exports.delete = async (req, res) => {
// 	const idpromotion = req.query.id || '';

// 	await Promotion.updateOne({ _id: idpromotion }, {
// 		status: false
// 	}, (err) => {
// 		if (err) {
// 			res.status(400).send({
// 				isSuccess: false
// 			})
// 		} else {
// 			res.status(200).send({
// 				isSuccess: true
// 			})
// 		}
// 	})

// }