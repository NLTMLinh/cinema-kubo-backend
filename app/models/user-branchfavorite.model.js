const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;

const UserBranchFavoSchema = mongoose.Schema({
  iduser: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  idbranch: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Branch'
  }
});

module.exports = mongoose.model("BranchFavorite", UserBranchFavoSchema);
