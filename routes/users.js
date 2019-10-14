var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User model
const User = require('../models/Users');

// Login page
router.get('/login', (req, res) => res.send('Login'));

// Register
router.get('/register', (req, res) => res.send('Register'));

// Register handle
router.post('/register', (req, res) => {
  const { name, email, password, password1 } = req.body;
  let errors = [];

  // Check
  if (!name || !email || !password || !password1) {
    errors.push({ msg: 'fill out' });
  }
  if (password != password1) {
    errors.push({ msg: 'password do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'password should be length 6' });
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password1
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password1
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hash
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/me',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
