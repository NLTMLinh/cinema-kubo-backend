const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullname: String,
    birthday: Date,
    username: String,
    email: String,
    password: String,
    phone: String,
    type: String,
    point: Number
})

module.exports = mongoose.model('User',UserSchema);