const mongoose = require('mongoose');
const Const = require('../../constants');

const TypePaymentSchema = mongoose.Schema({
	name: String
});

module.exports = mongoose.model('TypePayment', TypePaymentSchema);
