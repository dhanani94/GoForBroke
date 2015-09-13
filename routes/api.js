var express = require('express');
var router = express.Router();
var capitalOneKey = require('../config').capitalOne || process.env.capitalOne;
var twilioSID = require('../config').twilioSID || process.env.twilioSID;
var twilioToken = require('../config').twilioToken || process.env.twilioToken;
var expediaKey = require('../config').expediaKey || process.env.expediaKey;
var request = require('superagent');
var moment = require('moment');
var Gun = require('gun');


var twilio = require('twilio')(twilioSID, twilioToken);


router.get('/amICool', function(req, res){
	var accountNumber = req.param('accoundID');
	var sendingData = {};
	var url = "http://api.reimaginebanking.com/accounts/"+accountNumber+"?key="+capitalOneKey;
	var url2 = "http://api.reimaginebanking.com/accounts/"+accountNumber+"/customer?key="+capitalOneKey;
	request.get(url).end(function(err1, data1){
		var data1 = JSON.parse(data1.text);
		sendingData.accountnickname = data1.nickname;
		sendingData.accountbalance = data1.balance;
		request.get(url2).end(function(err2, data2){
			var data2 = JSON.parse(data2.text);
			sendingData.first_name = data2.first_name;
			sendingData.last_name = data2.last_name;
			sendingData.address = data2.address;
			res.send(sendingData);
		});
	});
});

router.get('/nestOFF', function(req, res){
	console.log('got here!');
	res.sendStatus(200);
});

router.get('/callMe', function(req, res){
	var number = req.param('number');;
	var country = 'Russia'; ///theaoritcially should get this from db....
	// res.sendStatus(200);
	var counter = 0;
	console.log("doing twilio stuff");
	twilio.messages.create({
	    body: "listne to this shizzzz",
	    to: number,
	    from: "+16182056799"
	    // mediaUrl: "http://www.example.com/hearts.png"
	}, function(err, message) {
		twilio.calls.create({
		    url: "http://ringtones.mob.org/ringtone/4cujIqFbVfB2S8prH4mDRQ/1442159638/0788787e440846e8c93fd13a5d7b864f/crazy_frog-the_ding_dong_song.mp3",
		    to: number,
		    from: "+16182056799"
		}, function(err, status) {
		    	res.send(status);
		});
	});
})

router.get('/name', function(req, res){
	var country = req.param('country');
	var gender = req.param('gender');
	var url = "http://api.uinames.com/?gender="+
	gender+"&country="+
	country;
	request.get(url).end(function(err, data){
		res.send(data.text);
	});
});


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
	"&apikey="+expediaKey;

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
	var url = "http://terminal2.expedia.com/x/suggestions/regions?query=SFO&apikey="+expediaKey;
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
