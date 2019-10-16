var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const verify = require('./verifyToken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Dashboard
router.get('/me', verify, ensureAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = router;
