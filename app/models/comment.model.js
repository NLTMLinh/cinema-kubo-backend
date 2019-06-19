const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
	iduser: {
		type: String,
		require: true,
		ref: 'User'
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
