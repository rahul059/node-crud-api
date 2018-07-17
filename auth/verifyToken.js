var jwt = require('jsonwebtoken');
var config = require('../config/config');

// verify token for authorized request
function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
      return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  }
  module.exports = verifyToken;