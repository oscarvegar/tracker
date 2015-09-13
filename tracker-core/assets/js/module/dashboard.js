var app = angular.module( "track-dashboard", ['ui.router', 'uiGmapgoogle-maps'] );
app.controller( "DashboardCtrl", function($scope, $http, $rootScope, $location, $timeout, $state) {
  
	$scope.puntos = [];
	$scope.transportistas = [];
	$scope.markerIconSize = new google.maps.Size(30,30);
	$scope.conductor = null;
	$scope.init = function(){
	   	console.info("EN INIT...")
	   	$scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 6 };
	   	
	   	io.socket.get('/api/repartidor/subscribe',function(res){
	   		console.log("SUSCRITO A REPARTIDORES")
	   		for(var i in res.repartidores){
	   			var rep = res.repartidores[i];
	   			$scope.renderPosition({id:rep.id,icon:rep.icon,coordinates:rep.currentLocation.coordinates,repartidor:rep},i);
	   		}
		  	/*console.info("res:::::  ", res)
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
		  	}*/
	   	}); 

	   	$scope.detalleModelorama = function( marker ){
  			console.log("Clicked en puntos", marker.model);
            $scope.puntoData = marker.model;
            console.log("data:: ", $scope.puntoData);
            $('#modalPuntos').modal('show')
            $scope.$apply();
  		}

	   	$http.get("/api/modelorama/all").success(function(modeloramas){
	   		$scope.modeloramas=[];
	   		for(var p in modeloramas){
	   			$scope.modeloramas[p]={};
	  			$scope.modeloramas[p].id = modeloramas[p].id;
	   			var icon = "/office-building.png";

		  		$scope.modeloramas[p].icon = {};
		  		$scope.modeloramas[p].icon.url = icon;
		  		$scope.modeloramas[p].icon.scaledSize = $scope.markerIconSize;
			  	$scope.modeloramas[p].latitude = modeloramas[p].location.coordinates[1];
			  	$scope.modeloramas[p].longitude = modeloramas[p].location.coordinates[0];
			  	$scope.modeloramas[p].title = modeloramas[p].nombre;
			  	$scope.modeloramas[p].direccion = modeloramas[p].direccion;
			  	$scope.modeloramas[p].mostrarDatos=$scope.detalleModelorama;
		  		
	   		}
	   	})
        
       /* $http.get('/api/tracking/stopped').then(function(res) {
            console.log("Se detecta una unidad detenida" , angular.toJson(res.data.puntos));
            $scope.detenidos = res.data.puntos;
            for(var p in $scope.detenidos){
                var icon = $scope.detenidos[p].icon;
                $scope.detenidos[p].icon = {};
                $scope.detenidos[p].icon.url = icon;
                $scope.detenidos[p].icon.scaledSize = $scope.markerIconSize;
            }
        });*/

		console.log("Ir a detalle");


    	$http.get("/api/detalleorden/getDetalle").success(function(data){
  				$scope.detalleOrder = data[0];
  				console.log("detalleActual",$scope.detalleOrder);

		})    	


	}

	io.socket.on('update',function(obj){
		console.info("UPDATE DE POSICIÓN ;;; ",obj)
		for(var i in $scope.transportistas){
			if($scope.transportistas[i].id==obj.id){
				$scope.renderPosition(obj,i);
				break;
			}
		}
		
	});

	$scope.renderPosition = function(obj,index){

  		console.log("transportistas_: ", $scope.transportistas );
	  	if( !obj ) return;

	  	
	  	
	  	if(!$scope.transportistas[index]) {
	  		$scope.transportistas[index] = {};
	  	}

	  	$scope.transportistas[index].id = obj.id;
	  	$scope.transportistas[index].latitude = obj.coordinates[1];
	  	$scope.transportistas[index].longitude = obj.coordinates[0];
		$scope.transportistas[index].icon = {};
  		$scope.transportistas[index].icon.url = obj.icon;
  		$scope.transportistas[index].icon.scaledSize = $scope.markerIconSize;	
  		
  		if( obj.repartidor ){
  			$scope.transportistas[index].conductor = obj.repartidor;
  		}

  		$scope.transportistas[index].onClick = $scope.onClickTransportista;

  		//$scope.transportistas[obj.data.id].show = false;
  		//console.log("transportistas_: ", $scope.transportistas );
		$scope.$applyAsync();
	}

	$scope.onClickTransportista = function( marker ){
  			console.log("Clicked ", marker.model);
  			$http.get("/api/orden/repartidor/"+marker.model.conductor.id).success(function(data){
  				$scope.conductor = marker.model.conductor;
  				$scope.conductor.ordenesActuales = data;
  				console.log("ordenesActuales",data)
	            $('#myModal').modal('show')
	            //$scope.$apply();
  			})
            //marker.model.show = !marker.model.show;
            
  		}

	$scope.windowOptions = { visible: false, height:400 };

    $scope.onClick = function( marker ) {
    	console.log("on click marker model :: ", marker.model);
    	//marker.model.onClick();
		//$scope.$apply();
        //$scope.windowOptions.visible = ;r
         //$scope.selectedMarker = marker.model;
         //marker.model.show = true;
    };

   

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };

    


  	$scope.init();

  
    $scope.verDetalle = function(){
    	console.log("Ir a detalle");


    	$http.get("/api/detalleorden/getDetalle").success(function(data){
  				$scope.detalleOrder = data[0];
  				console.log("detalleActual",$scope.detalleOrder);
	           // $('#myModal').modal('show')

		    	$('#myModal').modal('hide');
		    	$timeout(function(){
		    		if( $rootScope.count === 6 ) $rootScope.count = 0;
			    	if( $rootScope.count === 0 ){
			    		$state.go("detalle", true);
			    		//window.location.href="/detalle";
			    		//$state.go( "detalle" );
			    	}else{
			    		//window.location.href="/detalle" + $scope.count;
			    		//$state.go("detalle" + $rootScope.count, true);
			    		$state.go("detalle", true);
			    	}
			    	$rootScope.count++;
		    	},400,false)

		})    	
    	
    };


});
