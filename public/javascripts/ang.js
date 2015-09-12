var app = angular.module('app', []);
var controllers = {};
var factories = {};
app.controller(controllers);
app.factory(factories);

controllers.MainController = function ($scope, MainFact){
	$scope.userInput = {};
	// var d = new Date(dateString);
	$scope.userInput.departureDate = new Date("10/22/2015");
	$scope.userInput.returnDate = new Date("10/25/2015");
	$scope.userInput.origin = "ATL";
	$scope.userInput.destination = "LAX";
	$scope.userInput.threshhold = "1250";

	function loadData() {
		MainFact.getData().success(function(data){
		$scope.displayInfo = data;
		// $scope.$apply();
		});
	} loadData();

	$scope.sendData  = function(){
		MainFact.sendData(
		{'name' : $scope.userInputGun}
		).success(function(){
			alert("success!");
			loadData();
		});
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

	services.sendData = function(jsonData){
		return $http.post('/api', jsonData);
	}

	return services;
}