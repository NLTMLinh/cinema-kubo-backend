const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullname: String,
  birthday: Date,
  username: String,
  email: String,
  password: String,
  phone: String,
  typeuser: String,
  point: Number,
  branchfavo: mongoose.Schema.Types.ObjectId,
  typefavo: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("User", UserSchema);
