const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
	idUser: {
		type: String,
		require: true
	},
	idfilm: {
		type: String,
		require: true
	},
	time: {
		type: Date,
		require: true
	},
	content: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('Comment', CommentSchema);
