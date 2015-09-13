var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('superagent');
var moment = require('moment');
var Gun = require('gun');


router.get('/allgood', function(req, res){
	console.log('got here!');
	var accoutNumber = req.body || 7;
	var balance = 1000;
	var fName = "Taufiq";
	var lName = "Dhanani";

	res.send({
		'balance' : balance,
		'firstName' : fName,
		'lastName' : lName
	});
});

router.get('/nestOFF', function(req, res){
	console.log('got here!');
	res.sendStatus(200);
});

router.get('/callMe', function(req, res){
	var number = req.body;
	var country = 'usa'; ///theaoritcially should get this from db....
	res.sendStatus(200);

})


router.post('/flight', function(req, res){
	var data = req.body;
	var userData = {};

	var departureDate = data.departureDate || moment();
	var departureDate = moment(departureDate);
	var returnDate = moment(departureDate).add(7, 'd');
	userData.departureDate = moment(departureDate).format("YYYY-MM-DD");
	userData.returnDate = moment(returnDate).format("YYYY-MM-DD");

	userData.origin = data.origin || "ATL";
	userData.destination = data.destination || generateDestination();
	userData.regionid = 6000479; //////NEED TO GENERATE THIS
	userData.threshhold = 1250; //////wHAT THE FUCK IS THIS?!?!
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
	    res.send(data.text);
	});

});

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("testing");

	req.gun.get('names').map(function(data){
		req.b
	});
  res.send(data);
});

function generateDestination(){
	var rtnObj = {
		"airport" : "LAX"
	};
	return rtnObj;
}


router.get("/temp", function(req,res){
	var url = "http://terminal2.expedia.com/x/suggestions/regions?query=SFO&apikey="+config.expediaKey;
	request.get(url).end(function(err, data){
		res.send(data.text);
	});
});

router.get("/temp2", function(req,res){
	var threshhold = {};
	var url = "http://api.reimaginebanking.com/accounts/55e94a6cf8d8770528e616b1?key=fa40c3057aeb427edf10918e2e63ced4";
	request.get(url).end(function(err, data){
		res.send(data.text);
	});
});

router.post('/', function(req, res){
	console.log("hello");
	var data = req.body;
	var randomId = Gun.text.random(6);
	// data = randomId;
	// console.log("save to gun", data);
	// var itemName= req.param('key');
	req.gun.set({randomId : data}, function(err, ok){
		console.log("data WAS SAVED?", err, ok);
	}).key("names");

	res.send(200);
});

module.exports = router;
