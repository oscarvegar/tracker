angular.module( "track-orden", ['ui.router'] )
.controller('OrdenCtrl', function($scope,$stateParams,$http){
	console.log("route params",$stateParams)
	$scope.init = function(){
		$http.get("/api/detalleorden/getDetalle/"+$stateParams.id)
		.success(function(data){
  				$scope.detalleOrder =  data;
  				$scope.detalles = data.detalle;
  				console.log("ORDEN",$scope.detalleOrder);
  				console.log("DETALLES",$scope.detalles);
		})
	}
	$scope.init();   
	
})
 