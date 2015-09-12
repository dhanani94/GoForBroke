var app = angular.module('app', []);
var controllers = {};
var factories = {};
app.controller(controllers);
app.factory(factories);

controllers.MainController = function ($scope, MainFact){
	function loadData() {
		MainFact.getData().success(function(data){
		$scope.displayInfo = data;
		$scope.$apply();
		});
	} loadData();

	$scope.sendData  = function(){
		MainFact.sendData(
		{'name' : $scope.userInput}
		).success(function(){
			alert("success!");
			loadData();
		});
	}



}

factories.MainFact = function($http){
	var services = {};

	services.getData = function(){
		return $http.get('/api');
	}

	services.sendData = function(jsonData){
		return $http.post('/api', jsonData);
	}

	return services;
}