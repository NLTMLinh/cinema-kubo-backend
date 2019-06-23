const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({
	name: String,
	address: String,
	status: {
		type: Boolean,
		default: true
	},
	img: String
});

module.exports = mongoose.model('Branch', BranchSchema);
