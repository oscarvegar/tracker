var app = angular.module( "track-dashboard", ['ui.router', 'uiGmapgoogle-maps'] );
app.controller( "DashboardCtrl", function($scope, $http, $rootScope, $location, $timeout, $state) {
  	$scope.lastRender = 0;
	$scope.puntos = [];
	$scope.transportistas = [];
	$scope.markerIconSize = new google.maps.Size(35,35);
	$scope.conductor = null;
	$scope.ordenes=[];
	$scope.init = function(){
	   	console.info("EN INIT...");
	   	var menuDashboard = angular.element( document.querySelector( '#dashboard' ) );
        menuDashboard.addClass('active'); 
	   	$scope.map = { center: { latitude: 19.432791, longitude: -99.1335314 }, zoom: 10 };
	   	
	   	io.socket.get('/api/dashboard/subscribe',function(res){
	   		console.log("SUSCRITO A REPARTIDORES")
	   		console.log("REPARTIDORES ",res.repartidores)
	   		for(var i in res.repartidores){
	   			var rep = res.repartidores[i];
	   			$scope.renderPosition({id:rep.id,icon:rep.icon,coordinates:rep.currentLocation.coordinates,repartidor:rep},i);
	   		}
	   			
	   		for(var p in res.ordenes){
	   			var rep = res.ordenes[p];
		   			$scope.ordenes[p]={};
		  			$scope.ordenes[p].id = res.ordenes[p].id;
			  		$scope.ordenes[p].icon = {};
					$scope.ordenes[p].icon.url = res.ordenes[p].icon;
			  		$scope.ordenes[p].icon.scaledSize = $scope.markerIconSize;
				  	$scope.ordenes[p].latitude = res.ordenes[p].location.coordinates[1];
				  	$scope.ordenes[p].longitude = res.ordenes[p].location.coordinates[0];
				  	$scope.ordenes[p].title = "Orden "+res.ordenes[p].id;
				  	$scope.ordenes[p].direccion = res.ordenes[p].direccion.direccionCompleta;
				  	$scope.ordenes[p].detalle = "Repartidor: "+res.ordenes[p].repartidor.nombre;
				  	$scope.ordenes[p].mostrarDatos=$scope.detalleModelorama;
				  	console.log(rep)
			  		$scope.$apply();
	   		}
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
	   			var icon = "/icon/beer.png";

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

	}
	$scope.renderqueue = [];
	setInterval(function(){
		if($scope.renderqueue.length==0)return;

		console.info("UPDATE DE POSICIÓN ;;; ",$scope.renderqueue,new Date().getTime())
		var objs = $scope.renderqueue.splice(0,10);
		for(var k in objs){
			var obj = objs[k];
			if(!obj)continue;
			//console.log("OBJ",obj)
			//console.log(new Date())
			var found = false;
			for(var i in $scope.transportistas){
				if($scope.transportistas[i].id==obj.id){
					$scope.renderPosition(obj,i);
					found = true;
					break;
				}
			}
			if(!found){
				
				$scope.renderPosition(obj,$scope.transportistas.length-1);
			}
		}
	},50)
	io.socket.on('updatePosition',function(obj){
		var found = false;
			for(var i in $scope.transportistas){
				if($scope.transportistas[i].id==obj.id){
					$scope.renderPosition(obj,i);
					found = true;
					break;
				}
			}
			if(!found){
				
				$scope.renderPosition(obj,$scope.transportistas.length-1);
			}
	});

	io.socket.on('nuevaOrden',function(orden){
		var newOrden={};
		newOrden.id = orden.id;
  		newOrden.icon = {};
		newOrden.icon.url = orden.icon;
  		newOrden.icon.scaledSize = $scope.markerIconSize;
	  	newOrden.latitude = orden.location.coordinates[1];
	  	newOrden.longitude = orden.location.coordinates[0];
	  	newOrden.title = "Orden "+orden.id;
	  	newOrden.direccion = orden.direccion.direccionCompleta;
	  	newOrden.detalle = "Repartidor: "+orden.repartidor.nombre;
	  	newOrden.mostrarDatos=$scope.detalleModelorama;
	  	$scope.ordenes.push(newOrden);
  		$scope.$apply();
		
	});

	$scope.init();

	io.socket.on('connect', function(){
      	console.log('CONECTADO A SERVIDOR');
  		$scope.init();
  	});

	io.socket.on('disconnect', function(){
      console.log('Lost connection to server');
  	});


	$scope.renderPosition = function(obj,index){

  		//console.log("transportistas_: ", $scope.transportistas );
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

    



  
    $scope.verDetalle = function(orderId){
    	console.log("Ir a detalle");
    	console.log(orderId);


    	$http.get("/api/detalleorden/getDetalle/"+orderId).success(function(data){
  				$rootScope.detalleOrder =  data;
  				console.log("detalleOrden",$rootScope.detalleOrder);

  				  $rootScope.detalleOrd = new Array();
				      for(var i=0;i<$rootScope.detalleOrder.length;i++){
				      	for(var j=0;j<$scope.detalleOrder[i].detalle.length;j++){
				                 $rootScope.detalleOrd.push({
				                   "nombre": $rootScope.detalleOrder[i].detalle[j].nombre,
				                   "presentacion": $rootScope.detalleOrder[i].detalle[j].presentacion,
				                   "cantidad": $rootScope.detalleOrder[i].detalle[j].cantidad,
				                   "precio": $rootScope.detalleOrder[i].detalle[j].precio,
				                   "subtotal": $rootScope.detalleOrder[i].detalle[j].precio,
				                 });
				         }        
				      }

				      console.log("nuevo detalle");
				      console.log( $rootScope.detalleOrd );


		    	$('#myModal').modal('hide');
		    	$timeout(function(){
			    		$state.go("orden",{ id: orderId }, true);
		    	},400,false)

		})    	
    	
    };


});
