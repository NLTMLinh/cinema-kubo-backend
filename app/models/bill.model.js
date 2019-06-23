const mongoose = require('mongoose');
const Const = require('../../constants');

const BillSchema = mongoose.Schema({
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	idPromotion: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Promotion'
	},
	quantity: Number,
	sum: Number,
	idTypePayment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TypePayment'
	},
	seat: [{
		type: Number
	}],
	idSchedule: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Schedule'
	}
});

module.exports = mongoose.model('Bill', BillSchema);
