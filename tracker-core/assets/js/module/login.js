var app = angular.module( "LoginApp", [] );
app.controller( "LoginController", function($scope, $http, $rootScope, $location) {
  	$scope.usuario = {};
	$scope.login = function(){
		console.info($scope.usuario.email )
		console.info($scope.usuario.password )
		if($scope.usuario.email == "operador@tradeco.com" && $scope.usuario.password =="admin123"){
			console.info("si es")
			window.location="/";
		}
	}

});
