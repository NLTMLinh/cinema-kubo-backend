const Bill = require('../models/bill.model');
const Schedule = require('../models/schedule.model');
const Const = require('../../constants');

exports.read = (req, res) => {
	Bill.find({}, (err, result) => {
		if (err) {
			res.status(Const.SUCCESS_CODE).send(err);
		} else {
			res.send(result);
		}
	})
}

//input query: id bill
exports.getOne = (req, res) => {
	Bill.findById(req.query.id || '', (err, result) => {
		if (err) {
			res.status(Const.SUCCESS_CODE).send(err);
		} else {
			res.send(result);
		}
	})
}

exports.create = (req, res) => {
	const idUser = req.body.idUser;
	const idPromotion = req.body.idPromotion || '';
	const idTypePayment = req.body.idTypePayment;
	const quantity = req.body.quantity;
	const sum = req.body.sum;
	const seat = req.body.seat;
	const idSchedule = req.body.idSchedule;
	// console.log("test idUser: ", idUser);
	// Validate request
	if (!idUser || !quantity || !sum || !seat || !idSchedule || !idTypePayment) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}
	// Create a Note
	const bill = new Bill({ idUser, idPromotion, quantity, sum, idTypePayment, seat, idSchedule });
	//edit seatState in schedule
	Schedule.findById(idSchedule, (err, schedule) => {
		if (err) {
			return res.status(400).send({
				message: 'Schedule not found'
			});
		} else {
			let stateSeat = schedule.stateSeat;
			seat.forEach(element => {
				stateSeat[element] = Const.UNAVAILABLE_TICKET_SIGN;
			});
			console.log("seat state after: ", stateSeat);
			Schedule.updateOne({ _id: idSchedule }, { stateSeat }, (err, result) => {
				if (err) {
					return res.status(400).send({
						message: 'Update schedule seatstate failed!'
					});
				} else {
					console.log("updated seatstate schedule: ", result);
					// Save Note in the database
					bill
						.save()
						.then((data) => {
							res.send(data);
						})
						.catch((err) => {
							res.status(500).send({
								message: err.message || 'Some error occurred while creating the Note.'
							});
						});
				}
			})
		}
	})
};

// exports.create = (req, res) => {
// 	const idUser = req.query.idUser;
// 	const idPromotion = req.query.idPromotion || '';
// 	const idTypePayment = req.query.idTypePayment;
// 	const quantity = req.query.quantity;
// 	const sum = req.query.sum;
// 	const seat = req.query.seat;
// 	const idSchedule = req.query.idSchedule;
// 	// Validate request
// 	if (!idUser || !quantity || !sum || !seat || !idSchedule || !idTypePayment) {
// 		return res.status(400).send({
// 			message: 'Data can not be empty'
// 		});
// 	}
// 	// Create a Note
// 	const bill = new Bill({ idUser, idPromotion, quantity, sum, idTypePayment, seat, idSchedule });
// 	//edit seatState in schedule
// 	Schedule.findById(idSchedule, (err, schedule) => {
// 		if (err) {
// 			return res.status(400).send({
// 				message: 'Schedule not found'
// 			});
// 		} else {
// 			let stateSeat = schedule.stateSeat;
// 			seat.forEach(element => {
// 				stateSeat[element] = Const.UNAVAILABLE_TICKET_SIGN;
// 			});
// 			Schedule.updateOne({ _id: idSchedule }, { stateSeat }, (err, result) => {
// 				if (err) {
// 					return res.status(400).send({
// 						message: 'Update schedule seatstate failed!'
// 					});
// 				} else {
// 					console.log("updated seatstate schedule: ", result);
// 					// Save Note in the database
// 					bill
// 						.save()
// 						.then((data) => {
// 							res.send(data);
// 						})
// 						.catch((err) => {
// 							res.status(500).send({
// 								message: err.message || 'Some error occurred while creating the Note.'
// 							});
// 						});
// 				}
// 			})
// 		}
// 	})
// };