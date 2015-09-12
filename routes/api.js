var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// var itemName= req.param('key');
  req.gun.get("hello").val(function(data){
    res.send(data.name); 
  });
});

router.post('/', function(req, res, next){
	var data = req.body;
	console.log("save to gun", data);
	// var itemName= req.param('key');
	req.gun.put(data, function(err, ok){
		console.log("data WAS SAVED?", err);
	}).key("hello");

	res.send(200);
});

module.exports = router;
