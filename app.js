// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config      = require('./config/config'); // get our config file
var User        = require('./routes/user'); // get our user route
var Portfolio   = require('./routes/portFolio'); // get our user route

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; 
mongoose.connect(config.database); // connect to database


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// basic route
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});


// API ROUTES -------------------
// user routes
app.use("/user",User);
app.use("/portfolio",Portfolio);

// handle all bad request
app.use(function(req,res,next){
    return res.status(400).json({
        message : "Sorry can't find"
    });
});


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('server start at http://localhost:' + port);