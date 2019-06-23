const mongoose = require('mongoose');
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
		default: 100
	},
	availableTicket: {
		type: Number,
		default: 100
	}
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
