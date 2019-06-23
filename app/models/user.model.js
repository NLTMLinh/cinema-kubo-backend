const mongoose = require('mongoose');
const Const = require('../../constants');

const UserSchema = mongoose.Schema({
	username: String,
	fullname: String,
	birthday: Date,
	email: String,
	password: String,
	phone: String,
	typeuser: {
		type: mongoose.Schema.Types.ObjectId,
		default: Const.DEFAULT_TYPE_USER_ID,
		ref: 'TypeUser'
	},
	point: { type: Number, default: 0 }
	// branchfavo: mongoose.Schema.Types.ObjectId,
	// typefavo: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('User', UserSchema);
