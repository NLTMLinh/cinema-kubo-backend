const mongoose = require('mongoose');
const Const = require('../../constants');

const PromotionSchema = mongoose.Schema({
	name: {
		type: String,
		default: "Ưu đãi"
	},
	idTypeUser: [{
		type: mongoose.Schema.ObjectId,
		ref: 'TypeUser'
	}],
	idFilm: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Film'
	}],
	startTime: {
		type: Date,
		default: Date.now()
	},
	endTime: {
		type: Date
	},
	status: {
		type: Boolean,
		default: true
	},
	discount: {
		type: Number,
		default: Const.DEFAULT_PROMOTION
	},
	description: String
});

// const TypeUser = mongoose.model('TypeUser', TypeUserSchema, 'idTypeUser');
// const Film = mongoose.model('Film', FilmSchema, 'idFilm');
// module.exports = {
// 	TypeUser, Film
// }

module.exports = mongoose.model('Promotion', PromotionSchema);
