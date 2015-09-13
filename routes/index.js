var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Welcome to my crib.' });
});

/* GET home page. */
router.get('/ring', function(req, res, next) {
  res.render('ring.html', { title: 'Welcome to my crib.' });
});

module.exports = router;

