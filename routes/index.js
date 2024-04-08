var express = require('express');
var router = express.Router();
const passport = require('passport')
const localStrategy = require('passport-local')
const userModel = require('./users')
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET Login route

router.get('/login', function (req, res) {
  res.render('login')
})


// GET register route

router.get('/register', function (req, res) {
  res.render('register')
})

// GET Logout route
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// GET Profile route
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile')
})

// POST register route
router.post('/register', function (req, res, next) {
  // Getting data
  const userData = new userModel({
    username: req.body.username,
    secret: req.body.secret
  })
  // Adding data to db
  userModel.register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
      })
    })
})

// POST login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) { })

// Middleware Functions

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = router;
