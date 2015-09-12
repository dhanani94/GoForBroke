var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('superagent');
var moment = require('moment');




/* GET users listing. */
router.get('/', function(req, res, next) {
req.gun.get('hello').set().val(function(who, field){
  // console.log(who, field);
  res.send(200);
  // {title: "The Doctor", phone: '770-090-0461'}
})
});


router.post('/flight', function(req, res){
	var data = req.body;
	var userData = {};
	userData.departureDate = moment(data.departureDate).format("YYYY-MM-DD") || "2015-10-20";
	userData.returnDate = moment(data.returnDate).format("YYYY-MM-DD") || "2015-10-20";
	userData.origin = data.origin || "ATL";
	userData.destination = data.destination || "LAX";
	userData.regionid = 6000479;
	console.log("dude im sending this: " + userData.departureDate);
	var url = "http://terminal2.expedia.com/x/packages?departureDate="+
	userData.departureDate+"&originAirport="+
	userData.origin+"&destinationAirport="+
	userData.destination+"&returnDate="+
	userData.returnDate+"&regionid="+
	userData.regionid+"&limit=1"+
	"&apikey="+config.expediaKey;

	request
	.get(url)
	.end(function(err, data){
	    // console.log(data);
	    res.send(data.text);
	});

});


router.get("/temp", function(req,res){
	var url = "http://terminal2.expedia.com/x/suggestions/regions?query=SFO&apikey="+config.expediaKey;
	request.get(url).end(function(err, data){
		res.send(data.text);
	});
});

router.post('/', function(req, res){
	var data = req.body;
	console.log("save to gun", data);
	// var itemName= req.param('key');
	req.gun.put(data, function(err, ok){
		// console.log("data WAS SAVED?", err);
	}).key("hello");

	res.send(200);
});

module.exports = router;
