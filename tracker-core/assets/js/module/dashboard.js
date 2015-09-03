var app = angular.module( "track-dashboard", ['ui.router', 'uiGmapgoogle-maps'] );
app.controller( "DashboardCtrl", function($scope, $http, $rootScope, $location, $timeout, $state) {
  
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
		  		$scope.puntos[p].mostrarDatos=function( marker ){
		  			console.log("Clicked en puntos", marker.model);
		            $scope.puntoData = marker.model;
		            console.log("data:: ", $scope.puntoData);
		            $('#modalPuntos').modal('show')
		            $scope.$apply();
		  		}
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
	  	console.info("UN TRACKER LLEGA",obj)
	  	obj.data.id = eval(obj.data.id);
	  	
	  	if(!$scope.transportistas[obj.data.id]) {
	  		$scope.transportistas[obj.data.id] = {};
	  	}

	  	$scope.transportistas[obj.data.id].id = obj.data.id;
	  	$scope.transportistas[obj.data.id].latitude = eval(obj.data.latitude);
	  	$scope.transportistas[obj.data.id].longitude = eval(obj.data.longitude);
		$scope.transportistas[obj.data.id].icon = {};
  		$scope.transportistas[obj.data.id].icon.url = obj.data.icon;
  		$scope.transportistas[obj.data.id].icon.scaledSize = $scope.markerIconSize;	
  		
  		if( obj.data.conductor ){
  			$scope.transportistas[obj.data.id].conductor = obj.data.conductor;
  		}

  		$scope.transportistas[obj.data.id].onClick = function( marker ){
  			console.log("Clicked ", marker.model);
            //marker.model.show = !marker.model.show;
            $scope.conductor = marker.model.conductor;
            $('#myModal').modal('show')
            $scope.$apply();
  		}

  		//$scope.transportistas[obj.data.id].show = false;
  		//console.log("transportistas_: ", $scope.transportistas );
		$scope.$applyAsync();
	});

	$scope.windowOptions = { visible: false, height:400 };

    $scope.onClick = function( marker ) {
    	console.log("on click marker model :: ", marker.model);
    	//marker.model.onClick();
		//$scope.$apply();
        //$scope.windowOptions.visible = ;r
         //$scope.selectedMarker = marker.model;
         //marker.model.show = true;
    };

    $scope.mostrarDatos = function( marker ) {
    	console.log("on click en puntos :: marker model :: ", marker.model);
    	//marker.model.onClick();
		//$scope.$apply();
        //$scope.windowOptions.visible = ;r
         //$scope.selectedMarker = marker.model;
         //marker.model.show = true;
    };

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };

    
    
    $scope.verDetalle = function(){
    	console.log("Ir a detalle");
    	$('#myModal').modal('hide')
    	$timeout(function(){
    		if( $rootScope.count === 6 ) $rootScope.count = 0;
	    	if( $rootScope.count === 0 ){
	    		$state.go("detalle", true);
	    		//window.location.href="/detalle";
	    		//$state.go( "detalle" );
	    	}else{
	    		//window.location.href="/detalle" + $scope.count;
	    		$state.go("detalle" + $rootScope.count, true);
	    	}
	    	$rootScope.count++;
    	},400,false)
    	
    };

  	$scope.init();


});
