var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config/config');
var User = require('../models/user');

// route of registeration for users
router.post('/register', function(req, res) {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).json({
          message: err
        });
      } else {
        // user.hash_password = undefined;
        return res.status(201).json({
            message : "Successfully Registered."
        });
      }
    });
});

// route of login for users
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {

        if (err)
            return res.status(500).json({message : 'Error on the server.'});
        if (!user)
            return res.status(404).send({message : 'No user found.'});
        //console.log(req.body);
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid)
            return res.status(500).json({ auth: false, token: null , message: "Username/Password Mismatch" });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({ auth: true, token: token ,message: "Successfully Login." });
    });
});



module.exports = router;


