const mongoose = require('mongoose');

const FilmSchema = mongoose.Schema({
	name: String,
	description: String,
	type: mongoose.Types.ObjectId,
	releaseDate: Date,
	duration: String,
	director: String,
	actors: String,
	language: String,
	age: Number,
	price: Number,
	isActive: Boolean,
	rate: Number,
	point: Number,
	img: String,
	status: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('Film', FilmSchema);
