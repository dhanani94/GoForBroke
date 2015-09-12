var app = angular.module('app', []);
var controllers = {};
var factories = {};
app.controller(controllers);
app.factory(factories);
var gun = Gun(location.origin + '/gun');
var people = gun.get('people').set();

controllers.MainController = function ($scope, MainFact){
	$scope.userInput = {};
	$scope.userInput.departureDate = new Date("10/22/2015");
	$scope.userInput.returnDate = new Date("10/25/2015");
	$scope.userInput.origin = "SFO";
	$scope.userInput.destination = "LAX";


   
	function nameLoaded(name){

	}

	var names = {};
	people.map().val(function(name, id){ 
		console.log("data from gun?", id, name);
		names[id] = name;
		$scope.displayInfo = names;
		$scope.$apply();
	 })

	function loadData() {
		MainFact.getData().success(function(data){
		// $scope.displayInfo = data;
			// data.forEach(nameLoaded)
		});
	}

	$scope.sendData  = function(){
		if($scope.userInputGun){
			people.set($scope.userInputGun);
			$scope.userInputGun = "";
		}
		// MainFact.sendData(
		// $scope.userInputGun
		// ).success(function(){
		// 	alert("success!");
		// 	loadData();
		// });
	}

	$scope.getFlights = function(){
		MainFact.getFlights($scope.userInput).success(function(data){
			$scope.flightInfo = data;
			// $scope.$apply();
		});
	}



}

factories.MainFact = function($http){
	var services = {};

	services.getData = function(){
		return $http.get('/api');
	}

	services.getFlights = function(params){
		return $http.post('/api/flight', params);
	}

	services.sendData = function(name){
		return $http.post('/api', name);
	}

	return services;
}