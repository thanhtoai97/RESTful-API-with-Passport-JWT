var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Dashboard
router.get('/me', ensureAuthenticated, (req, res) =>
  res.render('me', {
    user: req.user,
    email: req.email
  })
);

module.exports = router;
