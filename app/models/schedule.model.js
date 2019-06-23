const mongoose = require('mongoose');
const Const = require('../../constants');
const ObjectId = require('mongoose').Types.ObjectId;


const ScheduleSchema = mongoose.Schema({
	idbranch: {
		type: ObjectId,
		ref: 'Branch'
	},
	idfilm: {
		type: ObjectId,
		ref: 'Film'
	},
	idroom: {
		type: ObjectId,
		ref: 'Room'
	},
	startTime: Date,
	endTime: Date,
	sumTicket: {
		type: Number,
		default: Const.DEFAULT_TICKET
	},
	availableTicket: {
		type: Number,
		default: Const.DEFAULT_TICKET
	},
	stateSeat: {
		type: String,
		default: Const.DEFAULT_STATE_SEAT
	}
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
