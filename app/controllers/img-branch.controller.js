const Imgbranch = require('../models/img-branch.model');
const Branch = require('../models/branch.model');
const branchController = require('../controllers/branch.controller');
const ObjectId = require('mongoose').Types.ObjectId;

//input in query: idbranch
exports.read = (req, res) => {
	Imgbranch.findOne({ idbranch: req.query.idbranch })
		.then((imgbranch) => {
			res.send(imgbranch);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving notes.'
			});
		});
};

exports.create = (req, res) => {
	const idbranch = req.query.idbranch;
	// Validate request
	if (!idbranch || !req.body.name) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}

	if (!ObjectId.isValid(idbranch)) {
		return res.status(400).send({
			message: 'Id not valid'
		});
	}
	// kiểm tra xem có id trong bản chi nhánh chưa, nếu có thì tạo img vào bảng img-branh
	let img = req.files.img;
	if (!img.match('.(jpg|jpeg|png|gif)')) {
		return res.status(400).send({
			message: 'Image not format'
		});
	}
	if (!req.body.name || !req.body.address || !req.body.status) {
		return res.status(400).send({
			message: 'Data can not be empty'
		});
	}
	imageUploader(img).then(imglink => {
		Branch.findById({ _id: idbranch })
			.then((branch) => {
				const imgbranch = new Imgbranch({
					idbranch: branch._id,
					name: imglink
				});
				imgbranch
					.save()
					.then((data) => {
						res.send(data);
					})
					.catch((err) => {
						res.status(500).send({
							message: err.message || 'Some error occurred while creating the Note.'
						});
					});
			})
			.catch((err) =>
				res.status(500).send({
					message: err.message + ', Id not exist in branch table.'
				})
			);
	})
};

//input in query: inbranch
exports.delete = (req, res) => {
	const idbranch = req.query.idbranch;
	Imgbranch.deleteOne({ idbranch }, (err) => {
		if (err) {
			res.send({
				issuccess: false
			})
		} else {
			res.send({
				issuccess: true
			})
		}
	})
}
