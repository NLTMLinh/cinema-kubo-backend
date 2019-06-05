const CategoryFilm = require("../models/categoryfilm.model");

exports.read = (req, res) => {
  CategoryFilm.find()
    .then(categoryfilms => {
      res.send(categoryfilms);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Category name can not be empty"
    });
  }

  // Create a Note
  const categoryfilm = new CategoryFilm({
    name: req.body.name
  });

  // Save Note in the database
  categoryfilm
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
