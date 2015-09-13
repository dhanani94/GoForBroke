var app = angular.module('app', []);
var controllers = {};
var factories = {};
app.controller(controllers);
app.factory(factories);
// var gun = Gun(location.origin + '/gun');
// var people = gun.get('people').set();

var countries = {
	'China' : 'PEK',
	'India' : 'DEL',
	'Canada': 'YYZ',
	'Japan' : 'HND',
	'UK'    : 'LHR',
	'Thailand' : 'BKK',
	'France' : 'CDG',
	'Germany' : 'FRA'
}

var countries = [];
countries["Germany"] = {
	'country' : 'Germany',
	'flightCode' : 'FRA',
	'mp3' : 'http://www.nationalanthems.info/de.mp3',
	'message' : "Guten Tag! Listen to the German National Anthem to prepare you for your upcoming trip!"
}

countries["India"] = {
	'country' : 'India',
	'flightCode' : 'DEL',
	'mp3' : 'http://www.nationalanthems.info/in.mp3',
	'message' : "Namaste! Listen to the Indian National Anthem to prepare you for your upcoming trip!"
}
countries["China"]  = {
	'country' : 'China',
	'flightCode' : 'PEK',
	'mp3' : 'http://www.nationalanthems.info/cn.mp3',
	'message' : "Nin Hao! Listen to the Chinese National Anthem to prepare you for your upcoming trip!"
}
controllers.MainController = function ($scope, MainFact){
	// $scope.userInput = {};
	$scope.accountNum = '55e94a6cf8d8770528e616b2';
	// $scope.userInput.departureDate = new Date("10/22/2015");
	// $scope.userInput.returnDate = new Date("10/25/2015");
	// $scope.userInput.origin = "SFO";
	// $scope.userInput.destination = "LAX";
	// $scope.userInput.threshhold = "1250";

	// var names = {};
	// people.map().val(function(name, id){ 
	// 	if(!name){ return }
	// 	names[id] = name;
	// 	$scope.displayInfo = names;
	// 	$scope.$apply();
	//  })

	// $scope.sendData  = function(){
	// 	if($scope.userInputGun){
	// 		people.set($scope.userInputGun);
	// 		$scope.userInputGun = "";
	// 	}
	// }


	$scope.amICool = function(accountID, phoneNum){
		MainFact.amICool(accountID).success(function(data){
			$scope.accountInfo = data;
			$scope.accountInfo.phone = phoneNum;
			$scope.accountInfo.accountbalance ="$" + parseInt($scope.accountInfo.accountbalance).toLocaleString();
			// $scope.apply();
		});
	}

	$scope.callFriend = function(number){
		MainFact.callFriend(number).success(function(){});
	}
	$scope.gtfo = function(country){

		MainFact.nestMe("off").success(function(data){
			console.log("ran the nest thing");
		});

		console.log($scope.accountInfo.address.zip);
		MainFact.getFlights($scope.accountInfo.address.zip, country.code).success(function(data){
			$scope.flightInfo = data;
			console.log(data);
		});
		var countryName = country.country;
		MainFact.callFriend($scope.accountInfo.phone, countries[countryName].mp3, countries[countryName].message).success(function(data){
			console.log("made a call ;)");
		});
	}




}

factories.MainFact = function($http){
	var services = {};

	services.getFlights = function(zip, destination){
		return $http.get('/api/flight?zip='+zip+"&destination="+destination);
	}

	services.callFriend = function(phoneNumber, mp3Url, message){
		"http://localhost:3000/api/callme?number=+16232525264"
		// return $http.get('/api/callme?number=+1' + phoneNumber + "&mp3="+mp3Url);
		// console.log('/api/callme?number=+1' + phoneNumber + "&url=" + mp3Url + "&message" + message);
		return $http.get('/api/callme?number=+1' + phoneNumber + "&url=" + mp3Url + "&message=" + message);

	}
	services.nestMe = function(onOrOff){
		return $http.get('/api/nestOff');
	}

	services.amICool = function(accountID){
		return $http.get('/api/amICool?accountID=' +accountID);
	}


	return services;
}