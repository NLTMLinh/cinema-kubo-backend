const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
	idbranch: mongoose.Schema.Types.ObjectId,
	sumseat: Number,
	nameRoom: String,
	status: {
		type: String,
		default: true
	}
});

module.exports = mongoose.model('Room', RoomSchema);
