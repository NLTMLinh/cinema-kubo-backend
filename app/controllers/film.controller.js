const Film = require("../models/film.model");
const Schedule = require("../models/schedule.model");
const Img = require("../models/img-film.model");
const TypeFilm = require("../models/typefilm.model");
const imageUploader = require("imgur-uploader");
const Const = require("../../constants");
require("express-fileupload");

exports.read = (req, res) => {
  Film.find()
    .populate('type')
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
  let img = req.body.img;
  if (!img.match(".(jpg|jpeg|png|gif)")) {
    return res.status(400).send({
      message: "Image not format"
    });
  }
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.releaseDate ||
    !req.body.duration ||
    !req.body.director ||
    !req.body.actors ||
    !req.body.language ||
    !req.body.age ||
    !req.body.price ||
    !req.body.rate ||
    !req.body.point ||
    !req.body.img
  ) {
    return res.status(400).send({
      message: "Data can not be empty"
    });
  }
  imageUploader(img)
    .then(img => {
      const film = new Film({
        name: req.body.name,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        duration: req.body.duration,
        director: req.body.director,
        actors: req.body.actors,
        language: req.body.language,
        age: req.body.age,
        price: req.body.price,
        rate: req.body.rate,
        point: req.body.point,
        img: img.link
      });

      film
        .save()
        .then(data => {
          //save img
          const img = new Img({
            idfilm: data._id,
            name: data.img
          });
          img.save().catch(err =>
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Note."
            })
          );
          //send all film
          Film.find()
            .populate('type')
            .then((film) => {
              res.send(film);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || 'Some error occurred while retrieving notes.'
              });
            });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Note."
          });
        });
    })
    .catch(err =>
      res.status(400).send({
        message: "Error occured while load image"
      })
    );
};

//input query: idFilm
exports.update = async (req, res) => {
  const idFilm = req.query.id;
  console.log("on update id: ", req.body.name)
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.releaseDate ||
    !req.body.duration ||
    !req.body.director ||
    !req.body.actors ||
    !req.body.language ||
    !req.body.age ||
    !req.body.price ||
    !req.body.rate ||
    !req.body.point
  ) {
    return res.status(400).send({
      message: "Data can not be empty"
    });
  }

  await Film.update(
    { _id: idFilm },
    {
      name: req.body.name,
      description: req.body.description,
      releaseDate: req.body.releaseDate,
      duration: req.body.duration,
      director: req.body.director,
      actors: req.body.actors,
      language: req.body.language,
      age: req.body.age,
      price: req.body.price,
      rate: req.body.rate,
      point: req.body.point
    }, (err, result) => {
      console.log("result update: ", result);
      if (!err) {
        //return new film arr
        Film.find()
          .populate('type')
          .then((film) => {
            res.send(film);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || 'Some error occurred while retrieving notes.'
            });
          });
      }
    });
}

//input: idFilm
exports.delete = async (req, res) => {
  console.log("on delete film");
  const idFilm = req.query.id;
  //check is it has on schedule, if it is existed, cannot delete
  await Schedule.find({
    idfilm: idFilm,
    availableTicket: { $lt: Const.DEFAULT_SEAT_ROM }
  }, (err, result) => {
    if (!err && result.length > 0) {
      console.log("film exitst in schedule")
      Film.find({}, (err, all) => {
        if (!err) {
          res.send({
            isSuccess: false,
            message: "Phim đã tồn tại trong lịch chiếu và có khách hàng đã đặt vé nên không thể xóa.",
            data: all
          })
        }
      })
    } else if (!err) {
      console.log("film is not exitst in schedule")
      Schedule.find({
        idfilm: idFilm,
        availableTicket: { $eq: Const.DEFAULT_SEAT_ROM }
      }, (err, result) => {
        let message = "Xóa thành công";
        if (!err) {
          if (result.length > 0) {
            //delete schedule that has this film but no one buy ticket
            result.map(item => {
              Schedule.deleteOne({ _id: item._id })
            });
            message = "Xóa thành công! Nhưng đã xóa một số lịch chiếu liên quan đến phim này vì chưa có khách hàng nào đặt vé."
          }
          //then delete film
          Film.updateOne({ _id: idFilm }, { status: false }, (err, result) => {
            if (err) {
              res.status(500).send({ success: false });
            } else {
              //then return all film
              Film.find({}, (err, all) => {
                if (!err) {
                  res.send({
                    isSuccess: true,
                    message,
                    data: all
                  })
                }
              })
            }
          });
        }
      })
    }
  });
}
//get films have the same type
//input: idTypeFilm as id
exports.getFilmsInType = async (req, res) => {
  const typeFilmId = req.query.id;
  console.log("type", typeFilmId);
  await Film.find({ type: typeFilmId }, (err, result) => {
    if (err) {
      res.status(Const.ERROR_CODE).send({
        message: "There are somg thing wrong"
      });
    } else {
      res.status(Const.SUCCESS_CODE).send({
        result
      });
    }
  });
};
