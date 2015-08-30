var app = angular.module( "track-dashboard", ['ui.router', 'uiGmapgoogle-maps'] );
app.controller( "DashboardCtrl", function($scope, $http, $rootScope, $location, $timeout) {
  
	$scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 14 };
	$scope.ruta1 = {	
						id: 1,
						coords: {latitude:19.4286401, longitude:-99.1350092},
						icono: {url:'/home/temp/pickup_camper.png'}
					};
	$scope.puntos = [];
	$scope.init = function(){
	   	console.info("EN INIT...")
	   	io.socket.get('/tracking/subscribe',function(res){
	  	console.info("res:::::  ", res)
	  		$scope.puntos = res.puntos;
	  		$scope.puntos[0].icono = {url:"../pickup_camper.png"};
	   	}); 
	}

	io.socket.on('updateTracker',function(obj){
	  	console.info("UN TRACKER LLEGA",obj)
	    $scope.ruta1.coords.latitude += 0.20;
		$scope.ruta1.coords.longitude -= 0.20;
		$scope.$apply();
	});

	$scope.windowOptions = { visible: false, height:400 };

    $scope.onClick = function() {
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };

  	$scope.init();


});
