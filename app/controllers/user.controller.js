const User = require("../models/user.model");

exports.read = (req, res) => {
  user
    .find()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.fullname || !req.body.birthday || !req.body.username ||
   !req.body.email || !req.body.password || !req.body.phone ||
   !req.body.type || !req.body.point) {
    return res.status(400).send({
      message: "Data can not be empty"
    });
  }

  // Create a Note
  const user = new User({
    fullname: req.body.fullname,
    birthday: req.body.birthday,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    typeuser: req.body.typeuser,
    point: req.body.point,
    branchfavo: req.body.branchfavo || "",
    typefavo: req.body.typefavo || ""
  });

  // Save Note in the database
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
      });
    });
};
