var app = angular.module( "track-reporte", ['ui.router','ui.bootstrap'] );
app.controller( "ReporteCtrl", function($scope, $http, $rootScope, $location, $log, $timeout, $state) {
    
    $scope.init = function(){
        var menuSolicitudes = angular.element( document.querySelector( '#solicitudes' ) );
        menuSolicitudes.addClass('active'); 
        var menuDashboard = angular.element( document.querySelector( '#dashboard' ) );
        menuDashboard.removeClass('active'); 
        $scope.ordenes = [];
        console.log("INIT DE SOLICITUD DASH")
        io.socket.get('/api/orden/subscribe',function(res){
            console.info("SUSCRITO A SOCKET ORDENES", res)
            $scope.ordenes = res.ordenes;
            $scope.$apply()
        }); 
      };

      io.socket.on('create',function(obj){
        console.log("Orden Recibida",obj)
        $scope.nuevaOrden = obj;
        $("#modalNewOrden").modal();
        $scope.ordenes.push(obj);
        $scope.$apply()
      });

      

    $rootScope.tituloPagina = "Mis Solicitudes";
    $rootScope.iconoPagina = "icon-list";

    $scope.date = new Date();


    $scope.totalItems = 64;
    $scope.currentPage = 1;

      
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };


    $scope.verDetalle = function(orderId){
      $state.go("detalleOrden",{ id: orderId }, true);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.init();





  
});
