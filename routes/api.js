var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('superagent');



/* GET users listing. */
router.get('/', function(req, res, next) {
req.gun.get('hello').set().val(function(who, field){
  console.log(who, field);
  res.send(200);
  // {title: "The Doctor", phone: '770-090-0461'}
})
});


router.get('/flight', function(req, res){
	var data = req.body;
	var userData = {};
	userData.departureDate = data.departureDate || "2015-10-20";
	userData.returnDate = data.returnDate || "2015-10-30";
	userData.origin = data.origin || "ATL";
	userData.destination = data.destination || "LAX";
	userData.regionid = 6000479;
	var url = "http://terminal2.expedia.com/x/packages?departureDate="+userData.departureDate+"&originAirport="+userData.origin+"&destinationAirport="+userData.destination+"&returnDate="+userData.returnDate+"&regionid="+userData.regionid+"&apikey="+config.expediaKey;

	request
	.get(url)
	.end(function(err, data){
	    console.log(data);
	    res.send(data.text);
	});

});

router.post('/', function(req, res){
	var data = req.body;
	console.log("save to gun", data);
	// var itemName= req.param('key');
	req.gun.put(data, function(err, ok){
		console.log("data WAS SAVED?", err);
	}).key("hello");

	res.send(200);
});

module.exports = router;
