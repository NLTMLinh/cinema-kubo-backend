const Schedule = require('../models/schedule.model');
const Film = require('../models/film.model.js');
const Branch = require('../models/branch.model');
const Room = require('../models/room.model');

exports.read = (req, res) => {
	Schedule.find()
		.populate('idbranch')
		.populate('idfilm')
		.populate('idroom')
		.exec((err, schedule) => {
			if (err) {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving notes.'
				});
			} else {
				res.send(schedule);
			}
		})
};
//input in query: id schedule	as id
exports.getOne = (req, res) => {
	const idschedule = req.query.id || '';
	Schedule.findById(idschedule)
		.then((schedule) => {
			res.send(schedule);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving notes.'
			});
		});
};

//input in query: idfilm, idroom
//inpue in body: ...
exports.create = async (req, res) => {
	const idfilm = req.query.idfilm || '';
	const idroom = req.query.idroom || '';

	//check is it exits or not
	await Schedule.findOne({ idroom, startTime: req.body.startTime || '' }, (err, result) => {
		if (err || result) {
			res.status(500).send({
				message: err || 'The schedule has been existed. The room is in user at this time. Please choose onother time.',
				isSuccess: false
			});
		} else {
			console.log("id film:", idfilm)
			Film.findOne({ _id: idfilm, status: true || "true" }, (err, result) => {
				if (!result) {
					console.log("result film:", result);
					return res.status(500).send({
						message: 'Cannot find film or film was deleted'
					});
				}
				Room.findOne({ _id: idroom, status: true || "true" }, (err, room) => {
					if (!room) {
						return res.status(500).send({
							message: 'Cannot find room or room was deleted',
							isSuccess: false
						});
					}
					const schedule = new Schedule({
						idbranch: room.idbranch,
						idfilm,
						idroom,
						startTime: req.body.startTime || Date.now(),
						endTime: req.body.endTime || '',
						sumTicket: req.body.sumTicket || 100,
						availableTicket: req.body.sumTicket || 100
					})
					const newSchedule = schedule.save();
					if (!newSchedule) {
						return res.status(500).send({
							message: 'Some thing wrong when save new schedule',
							isSuccess: false
						});
					} else {
						res.send({
							isSuccess: true,
							result: newSchedule
						})
					}
				})
			})
		}
	})


};

// //input in query: id schedule	as id
// // NOT update img
// exports.update = async (req, res) => {
// 	const idschedule = req.query.id;
// 	if (!req.body.name || !req.body.address || !req.body.status) {
// 		return res.status(400).send({
// 			message: 'Data can not be empty'
// 		});
// 	}

// 	await Schedule.updateOne({ _id: idschedule }, {
// 		name: req.body.name,
// 		address: req.body.address
// 	}, (err, result) => {
// 		if (err) {
// 			res.status(400).send({
// 				isSuccess: false
// 			})
// 		} else {
// 			res.status(200).send({
// 				isSuccess: true,
// 				result
// 			})
// 		}
// 	})
// };


//input query: id schedule as id
// exports.delete = async (req, res) => {
// 	const idschedule = req.query.id || '';

// 	await Schedule.updateOne({ _id: idschedule }, {
// 		status: false
// 	}, (err) => {
// 		if (err) {
// 			res.status(400).send({
// 				isSuccess: false
// 			})
// 		} else {
// 			res.status(200).send({
// 				isSuccess: true
// 			})
// 		}
// 	})

// }