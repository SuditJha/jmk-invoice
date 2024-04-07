var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET Login page

router.get('/login', function (req, res) {
  res.render('login')
})

// GET register page

router.get('/register', function (req, res) {
  res.render('register')
})

module.exports = router;
