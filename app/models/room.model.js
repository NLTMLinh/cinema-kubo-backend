const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const RoomSchema = mongoose.Schema({
	idbranch: ObjectId,
	sumseat: Number,
	nameRoom: String,
	status: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('Room', RoomSchema);
