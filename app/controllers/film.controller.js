const Film = require('../models/film.model');
const Img = require('../models/img-film.model');
const TypeFilm = require('../models/typefilm.model');
const imageUploader = require('imgur-uploader');
const Const = require('../../constants');
require('express-fileupload');

exports.read = (req, res) => {
	Film.find()
		.then((film) => {
			res.send(film);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving notes.'
			});
		});
};

//input query: idFilm
exports.getOne = (req, res) => {
	Film.findById(req.query.id)
		.then((film) => {
			res.send(film);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving notes.'
			});
		});
};
exports.create = (req, res) => {
	// Validate request
	// if (!req.files) {
	//     return res.status(400).send({
	//         message: "File was not found"
	//     });
	// }

	// let img = req.files.img;
	let img = req.body.img;
	if (!img.match('.(jpg|jpeg|png|gif)')) {
		return res.status(400).send({
			message: 'Image not format'
		});
	}
	if (
		!req.body.name ||
		!req.body.type ||
		!req.body.releaseDate ||
		!req.body.duration ||
		!req.body.director ||
		!req.body.actors ||
		!req.body.price
	) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}
	imageUploader(img)
		.then((img) => {
			const film = new Film({
				name: req.body.name,
				description: req.body.description || '',
				type: req.body.type,
				releaseDate: req.body.releaseDate,
				duration: req.body.duration,
				director: req.body.director,
				actors: req.body.actors,
				language: req.body.language || '',
				age: req.body.age || 10,
				price: req.body.price,
				isActive: req.body.isActive,
				rate: req.body.rate,
				point: req.body.point
			});

			film
				.save()
				.then((data) => {
					const img = new Img({
						idfilm: data._id,
						name: data.img
					});
					img.save().catch((err) =>
						res.status(500).send({
							message: err.message || 'Some error occurred while creating the Note.'
						})
					);
					res.send({ data, img });
				})
				.catch((err) => {
					res.status(500).send({
						message: err.message || 'Some error occurred while creating the Note.'
					});
				});
		})
		.catch((err) =>
			res.status(400).send({
				message: 'Error occured while load image'
			})
		);
};

//input query: idFilm
exports.update = (req, res) => {
	const idFilm = req.query.id;
	if (
		!req.body.name ||
		!req.body.type ||
		!req.body.releaseDate ||
		!req.body.duration ||
		!req.body.director ||
		!req.body.actors ||
		!req.body.price
	) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}

	if (req.body.img) {
		let img = req.body.img;
		if (!img.match('.(jpg|jpeg|png|gif)')) {
			return res.status(400).send({
				message: 'Image not format'
			});
		} else {
			imageUploader(img).then((img) => {
				Film.update(
					{ _id: idFilm },
					{
						name: req.body.name,
						description: req.body.description || '',
						type: req.body.type,
						releaseDate: req.body.releaseDate,
						duration: req.body.duration,
						director: req.body.director,
						actors: req.body.actors,
						language: req.body.language || '',
						age: req.body.age || 10,
						price: req.body.price,
						isActive: req.body.isActive,
						rate: req.body.rate,
						point: req.body.point,
						img: img.link
					}
				);
				Img.update(
					{ idfilm: idFilm },
					{
						name: img.link
					}
				);
			});
		}
	} else {
		Film.update(
			{ _id: idFilm },
			{
				name: req.body.name,
				description: req.body.description || '',
				type: req.body.type,
				releaseDate: req.body.releaseDate,
				duration: req.body.duration,
				director: req.body.director,
				actors: req.body.actors,
				language: req.body.language || '',
				age: req.body.age || 10,
				price: req.body.price,
				isActive: req.body.isActive,
				rate: req.body.rate,
				point: req.body.point
			}
		);
	}
};

//input: idFilm
exports.delete = (req, res) => {
	const idFilm = req.query.id;
	Film.updateOne({ _id, idFilm }, { status: false }, (err, result) => {
		if (err) {
			res.status(500).send({ success: false });
		} else {
			res.status(200).send({ success: true, result });
		}
	});
};

//get films have the same type
//input: idTypeFilm
exports.getFilmsInType = async (req, res) => {
	const typeFilmId = req.query.id;
	await Film.find({ type: typeFilmId }, (err, result) => {
		if (err) {
			res.status(Const.ERROR_CODE).send({
				message: 'There are somg thing wrong'
			});
		} else {
			res.status(Const.SUCCESS_CODE).send({
				result
			});
		}
	});
};
