var app = angular.module( "track-dashboard", ['ui.router', 'uiGmapgoogle-maps'] );
app.controller( "DashboardCtrl", function($scope, $http, $rootScope, $location, $timeout) {
  
	$scope.puntos = [];
	$scope.transportistas = [];
	$scope.markerIconSize = new google.maps.Size(20,20);
	$scope.init = function(){
	   	console.info("EN INIT...")
	   	$scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 6 };
	   	io.socket.get('/tracking/subscribe',function(res){
		  	console.info("res:::::  ", res)
		  	$scope.puntos = res.puntos;
		  	for(var p in $scope.puntos){
		  		var icon = $scope.puntos[p].icon;
		  		$scope.puntos[p].icon = {};
		  		$scope.puntos[p].icon.url = icon;
		  		$scope.puntos[p].icon.scaledSize = $scope.markerIconSize;	
		  	}
		  	
	   	}); 

	}

	io.socket.on('updateTracker',function(obj){
	  	console.info("UN TRACKER LLEGA",obj)
	  	obj.data.id = eval(obj.data.id);
	  	if(!$scope.transportistas[obj.data.id]) {
	  		$scope.transportistas[obj.data.id] = {};
	  		$scope.transportistas[obj.data.id].icon = {};
	  	}
	  	$scope.transportistas[obj.data.id].id = obj.data.id;
	  	$scope.transportistas[obj.data.id].latitude = eval(obj.data.latitude);
	  	$scope.transportistas[obj.data.id].longitude = eval(obj.data.longitude);
		$scope.transportistas[obj.data.id].icon = {};
  		$scope.transportistas[obj.data.id].icon.url = obj.data.icon;
  		$scope.transportistas[obj.data.id].icon.scaledSize = $scope.markerIconSize;	
  		console.log("transportistas_: ", $scope.transportistas );
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
