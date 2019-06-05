const mongoose = require("mongoose");

const ImgBranchSchema = mongoose.Schema({
  idbranch: mongoose.Schema.Types.ObjectId,
  name: String
});

module.exports = mongoose.model("ImgBranch", ImgBranchSchema);
