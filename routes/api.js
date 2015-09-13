var express = require('express');
var router = express.Router();

try {
  var capitalOneKey = process.env.capitalOne || require('../config').capitalOne;
	var twilioSID =  process.env.twilioSID || require('../config').twilioSID;
	var twilioToken =  process.env.twilioToken || require('../config').twilioToken;
	var expediaKey =  process.env.expediaKey || require('../config').expediaKey;
  var parseID =  process.env.parseID || require('../config').parseID;
  var parseKey =  process.env.parseKey || require('../config').parseKey;
  var aerisapiID =  process.env.aerisapiID || require('../config').aerisapiID;
  var aerisapiKey =  process.env.aerisapiKey || require('../config').aerisapiKey;
}
catch(err) {
  var capitalOneKey = process.env.capitalOne;
	var twilioSID =  process.env.twilioSID;
	var twilioToken =  process.env.twilioToken;
	var expediaKey =  process.env.expediaKey;
  var parseID =  process.env.parseID;
  var parseKey =  process.env.parseKey;
  var aerisapiID =  process.env.aerisapiID;
  var aerisapiKey =  process.env.aerisapiKey;
}

var request = require('superagent');
var moment = require('moment');
var Gun = require('gun');

var twilio = require('twilio')(twilioSID, twilioToken);

router.get('/amICool', function(req, res){
	var accountNumber = req.param('accountID');
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
			// sendingData.address = data2.address;
			sendingData.address = {"street_number":"711","zip":"30332","state":"Georgia","city":"Atlanta","street_name":"Techwood Dr NW"};
			res.send(sendingData);
		});
	});
});

router.get('/nestOn', function(req, res){
	var body= {"hvac_mode":"cool"};
	var url = "https://firebase-apiserver01-tah01-iad01.dapi.production.nest.com:9553/devices/thermostats/1yhERjEzqST2azClwAPWexNmcuQaqjrV/?auth=c.uurlJhBh7mswBROzJFfjFpvGcGfARcDXMcOe1FHAa1QgiwCmSsnsub7etfwFnrHDgVX5EaH4qIXdRcxnI5LqfWL4dePaedRLFoimam7BDGEjHNhgnAbcsAwrc4U0wJPMsfzXOh55rBWMZ5Fu"
	request.put(url, body).end(function(err, data){
		res.sendStatus(200);
	});
});

router.get('/nestOff', function(req, res){
	var body= {"hvac_mode":"off"};
	var url = "https://firebase-apiserver01-tah01-iad01.dapi.production.nest.com:9553/devices/thermostats/1yhERjEzqST2azClwAPWexNmcuQaqjrV/?auth=c.uurlJhBh7mswBROzJFfjFpvGcGfARcDXMcOe1FHAa1QgiwCmSsnsub7etfwFnrHDgVX5EaH4qIXdRcxnI5LqfWL4dePaedRLFoimam7BDGEjHNhgnAbcsAwrc4U0wJPMsfzXOh55rBWMZ5Fu"
	request.put(url, body).end(function(err, data){
		res.sendStatus(200);
	});
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
	sendParse("Taufiq");
});



function sendParse(nameOfDude) {
	var url = "https://api.parse.com/1/push";
	var body = {"data":
			{"alert": "Welcome to your new life" + nameOfDude},
			"where" :
			{'deviceType' : "android"}
		};
	request
	  .post(url)
	  .send(body)
	  .set('X-Parse-Application-Id', parseID)
	  .set('X-Parse-REST-API-Key', parseKey)
	  .set('Content-Type', 'application/json')
	  .end(function(err, res){
	    console.log(err, res);
	  });
}


router.get('/flight', function(req, res){
	var zip = req.param('zip');
	var aeriurl = "http://api.aerisapi.com/places/airports/closest/?p="+
	zip+"&client_id="+
	aerisapiID+"&client_secret="+
	aerisapiKey+"&filter=largeairport";
	var userData = {};
	request.get(aeriurl)
	.end(function(err, data){
		var data = JSON.parse(data.text);
		console.log(req.param('destination'));
		var departureDate = req.param('departureDate') || moment();
		var departureDate = moment(departureDate).add(1, 'd');
		var returnDate = moment(departureDate).add(7, 'd');
		userData.departureDate = moment(departureDate).format("YYYY-MM-DD");
		userData.returnDate = moment(returnDate).format("YYYY-MM-DD");
		userData.origin = req.param('origin') || data.response[0].profile.local ||"ATL";
		userData.destination = req.param('destination') || "ATL";
		userData.regionid = 6000479; //////NEED TO GENERATE THIS
		var url = "http://terminal2.expedia.com/x/packages?departureDate="+
		userData.departureDate+"&originAirport="+
		userData.origin+"&destinationAirport="+
		userData.destination+"&returnDate="+
		userData.returnDate+"&regionid="+
		userData.regionid+"&limit=1"+
		"&apikey="+expediaKey;
		request.get(url)
		.end(function(err, data2){
			var data = JSON.parse(data2.text);
		    res.send(data);
		});
	});

});


module.exports = router;
