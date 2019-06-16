const mongoose = require('mongoose');

const TypeUser = mongoose.Schema({
	name: String,
	minscore: Number
});

module.exports = mongoose.model('TypeUser', TypeUser);
