const Typepayment = require('../models/type-payment.model');
const Const = require('../../constants');

exports.get = (req, res) => {
	Typepayment.find({}, (err, result) => {
		if (err) {
			res.status(Const.SUCCESS_CODE).send(err);
		} else {
			res.send(result);
		}
	})
}

//input query: id type
exports.getOne = (req, res) => {
	Typepayment.find({ id: req.query.id || '' }, (err, result) => {
		if (err) {
			res.status(Const.SUCCESS_CODE).send(err);
		} else {
			res.send(result);
		}
	})
}