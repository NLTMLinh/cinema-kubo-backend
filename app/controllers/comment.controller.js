const Comment = require('../models/comment.model');

exports.read = (req, res) => {
	Comment.find().then((comment) => res.send(comment)).catch((err) =>
		res.status(500).send({
			message: 'Some error occured while retrieving comments'
		})
	);
};

exports.create = (req, res) => {
	const comment = new Comment({
		// username: req.body.username,
		idUser: req.body.idUser,
		film: req.body.film,
		time: req.body.time,
		content: req.body.content
	});

	comment.save().then((comment) => res.send(comment)).catch((err) =>
		res.status(500).send({
			message: err.message + 'Some error occured while create a comment'
		})
	);
};
