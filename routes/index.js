var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Welcome to my crib.' });
});

/* GET home page. */
router.get('/digits', function(req, res, next) {
  res.render('digits.html', { title: 'Welcome to my crib.' });
});

module.exports = router;

