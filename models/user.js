
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// user schema
var userSchema = new Schema({
    name : String,
    email : String,
    password : String
});


module.exports = mongoose.model("User",userSchema);
