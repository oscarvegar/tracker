var app = angular.module( "LoginApp", ['ngRoute'] );
app.controller( "LoginController", function($scope, $http, $rootScope, $location) {
  
	$scope.login = function(){
		console.log("usuario: ", $scope.usuario);
	}

});
