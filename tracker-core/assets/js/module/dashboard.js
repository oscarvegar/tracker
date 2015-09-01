var app = angular.module( "track-dashboard", ['ui.router', 'uiGmapgoogle-maps'] );
app.controller( "DashboardCtrl", function($scope, $http, $rootScope, $location, $timeout) {
  
	$scope.puntos = [];
	$scope.transportistas = [];
	$scope.markerIconSize = new google.maps.Size(30,30);
	$scope.conductor = null;
	$scope.init = function(){
	   	console.info("EN INIT...")
	   	$scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 6 };
	   	io.socket.get('/api/tracking/subscribe',function(res){
		  	console.info("res:::::  ", res)
		  	$scope.puntos = res.puntos;
		  	for(var p in $scope.puntos){
		  		var icon = $scope.puntos[p].icon;
		  		$scope.puntos[p].icon = {};
		  		$scope.puntos[p].icon.url = icon;
		  		$scope.puntos[p].icon.scaledSize = $scope.markerIconSize;	
		  	}
	   	}); 
        $http.get('/api/tracking/stopped').then(function(res) {
            console.log("Se detecta una unidad detenida" , angular.toJson(res.data.puntos));
            $scope.detenidos = res.data.puntos;
            for(var p in $scope.detenidos){
                var icon = $scope.detenidos[p].icon;
                $scope.detenidos[p].icon = {};
                $scope.detenidos[p].icon.url = icon;
                $scope.detenidos[p].icon.scaledSize = $scope.markerIconSize;
            }
        });
	}

	io.socket.on('updateTracker',function(obj){
	  	//console.info("UN TRACKER LLEGA",obj)
	  	obj.data.id = eval(obj.data.id);
	  	if(!$scope.transportistas[obj.data.id]) {
	  		$scope.transportistas[obj.data.id] = {};
	  		$scope.transportistas[obj.data.id].icon = {};
	  		$scope.transportistas[obj.data.id].show = false;
	  	}
	  	if( obj.data.first ){
	  		$scope.transportistas[obj.data.id].onClick = function(){
	  			console.log("Clicked " + $scope.transportistas[obj.data.id].conductor);
	            $scope.transportistas[obj.data.id].show = !$scope.transportistas[obj.data.id].show;
	  		};
	  	}
	  	$scope.transportistas[obj.data.id].id = obj.data.id;
	  	$scope.transportistas[obj.data.id].latitude = eval(obj.data.latitude);
	  	$scope.transportistas[obj.data.id].longitude = eval(obj.data.longitude);
		$scope.transportistas[obj.data.id].icon = {};
  		$scope.transportistas[obj.data.id].icon.url = obj.data.icon;
  		$scope.transportistas[obj.data.id].icon.scaledSize = $scope.markerIconSize;	
  		$scope.transportistas[obj.data.id].conductor = obj.data.conductor;
  		$scope.transportistas[obj.data.id].onClick = function( marker ){
  			console.log("Clicked ", marker.model);
            marker.model.show = !marker.model.show;
            $scope.conductor = marker.model.conductor;
            $('#myModal').modal('show')
            $scope.$apply();
  		}
  		$scope.transportistas[obj.data.id].show = false;
  		console.log("transportistas_: ", $scope.transportistas );
		$scope.$apply();
	});

	$scope.windowOptions = { visible: false, height:400 };

    $scope.onClick = function( marker ) {
    	console.log("on click marker model :: ", marker.model);
    	//marker.model.onClick();
		//$scope.$apply();
        //$scope.windowOptions.visible = ;
         //$scope.selectedMarker = marker.model;
         //marker.model.show = true;
    };

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };

    $scope.count = 0;
    $scope.verDetalle = function(){
    	if($scope.count === 6 ) $scope.count = 0;
    	if( $scope.count === 0 ){
    		$location.href="/detalle";
    	}else{
    		$location.href="/detalle" + $scope.count;
    	}
    	$scope.count++;
    };

  	$scope.init();


});
