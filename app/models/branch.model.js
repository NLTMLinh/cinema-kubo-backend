const mongoose = require("mongoose");

const BranchSchema = mongoose.Schema({
  name: String,
  address: String,
  status: Number,
  img: String
});

module.exports = mongoose.model("Branch", BranchSchema);
