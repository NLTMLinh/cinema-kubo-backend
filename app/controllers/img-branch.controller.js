const Imgbranch = require("../models/img-branch.model");
const Branch = require("../models/branch.model");
const branchController = require("../controllers/branch.controller");
const ObjectId = require("mongoose").Types.ObjectId;
exports.read = (req, res) => {
  Imgbranch.find()
    .then(imgbranch => {
      res.send(imgbranch);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.idbranch || !req.body.name) {
    return res.status(400).send({
      message: "Data can not be empty"
    });
  }

  if (!ObjectId.isValid(req.body.idbranch)) {
    return res.status(400).send({
      message: "Id not valid"
    });
  }
  // kiểm tra xem có id trong bản chi nhánh chưa, nếu có thì tạo img vào bảng img-branh

  Branch.findById({ _id: req.body.idbranch })
    .then(branch => {
      const imgbranch = new Imgbranch({
        idbranch: branch._id,
        name: req.body.name
      });
      imgbranch
        .save()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Note."
          });
        });
    })
    .catch(err =>
      res.status(500).send({
        message: err.message + ", Id not exist in branch table"
      })
    );
};
