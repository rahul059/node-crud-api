// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// portfolio schema
var portfolioSchema = new Schema({
    portfolio_id: Number,
    title : String,
    description : String,
    service : String,
    url: String,
    client: String,
    projectdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Portfolio",portfolioSchema);