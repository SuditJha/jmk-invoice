var express = require('express');
var router = express.Router();
const passport = require('passport')
const localStrategy = require('passport-local')
const userModel = require('./users')
const customerModel = require('./customers')
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
router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })

  res.render('profile', { user })
})

// GET /Customer Route
router.get('/members', isLoggedIn, function (req, res, next) {
  res.render('members')
})

// GET Add Customer Route
router.get('/members/add', isLoggedIn, function (req, res, next) {
  res.render('members-add')
})

// GET View Customer Route
router.get('/members/view', isLoggedIn, function (req, res, next) {
  res.render('members-view')
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


// POST Add-Members ROute
router.post('/members/add', isLoggedIn, async function (req, res, next) {
  const { name, nickname, address, gst } = req.body
  const customer = await customerModel.create({
    name: name,
    nickname: nickname,
    address: address,
    gst: gst
  })
  const user = await userModel.findOne({ username: req.session.passport.user })
  user.customers.push(customer._id)
  await user.save()
  res.send("Customer Created")
})

// Middleware Functions

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = router;
