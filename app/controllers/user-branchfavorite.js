const BranchFavo = require("../models/user-branchfavorite");
const Branch = require("../models/branch.model");
const User = require("../models/user.model");
const branchController = require("./branch.controller");
const ObjectId = require("mongoose").Types.ObjectId;
exports.read = (req, res) => {
  BranchFavo.find()
    .then(branch => {
      res.send(branch);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.idbranch || !req.body.iduser) {
    return res.status(400).send({
      message: "Data can not be empty"
    });
  }

  if (!ObjectId.isValid(req.body.idbranch) || !ObjectId.isValid(req.body.iduser)) {
    return res.status(400).send({
      message: "Id not valid"
    });
  }
  // kiểm tra xem có id trong bản chi nhánh chưa, nếu có thì tạo img vào bảng img-branh

  Branch.findById({ _id: req.body.idbranch })
    .then(branch => {
      User.findById({_id:req.body.iduser })
      .then(user => {
        const branchfavo = new BranchFavo({
          idbranch: branch._id,
          iduser: user._id
        })

        branchfavo.save()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Note."
        }))
      })
      .catch(err =>  res.status(500).send({
        message: err.message + ", Id not exist in branch table."
      }))
    })
    .catch(err =>
      res.status(500).send({
        message: err.message + ", Id not exist in branch table."
      })
    );
};
