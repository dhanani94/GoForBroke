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
	$scope.userInput.threshhold = "1250";

	var names = {};
	people.map().val(function(name, id){ 
		if(!name){ return }
		names[id] = name;
		$scope.displayInfo = names;
		$scope.$apply();
	 })

	$scope.sendData  = function(){
		if($scope.userInputGun){
			people.set($scope.userInputGun);
			$scope.userInputGun = "";
		}
	}

	$scope.gtfo = function(){
		userData.origin = "ATL"; /// not hard code this l8r 
		MainFact.getFlights(userData).success(function(data){
			$scope.flightInfo = data;
			// $scope.$apply();
		});
	}



}

factories.MainFact = function($http){
	var services = {};

	services.getFlights = function(params){
		return $http.post('/api/flight', params);
	}


	return services;
}