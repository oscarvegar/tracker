var app = angular.module( "track-dashboard", ['ui.router', 'uiGmapgoogle-maps'] );
app.controller( "DashboardCtrl", function($scope, $http, $rootScope, $location, $timeout) {
  
	$scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 14 };
	$scope.ruta1 = {	
						id: 1,
						coords: {latitude:19.4286401, longitude:-99.1350092},
						icon: '../images/icon-tracker.jpg'
					};

	$scope.init = function(){
	   console.info("EN INIT...")
	   io.socket.get('/tracking/subscribe',function(res){
	    console.info(res)
	   }); 
	}

	io.socket.on('updateTracker',function(obj){
	  	console.info("UN TRACKER LLEGA",obj)
	    $scope.ruta1.coords.latitude += 0.20;
		$scope.ruta1.coords.longitude -= 0.20;
		$scope.$apply();
	});

  $scope.init();

});
