const mongoose = require("mongoose");

const UserBranchFavoSchema = mongoose.Schema({
  iduser: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  idbranch: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  }
});

module.exports = mongoose.model("BranchFavorite", UserBranchFavoSchema);
