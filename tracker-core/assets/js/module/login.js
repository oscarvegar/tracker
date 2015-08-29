var app = angular.module( "LoginApp", ['ui.router'] );
app.controller( "LoginController", function($scope, $http, $rootScope, $location) {
  
	$scope.login = function(){
		console.log("usuario: ", $scope.usuario);
	}

});
