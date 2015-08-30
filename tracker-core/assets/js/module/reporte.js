var app = angular.module( "track-reporte", ['ui.router','ui.bootstrap'] );
app.controller( "ReporteCtrl", function($scope, $http, $rootScope, $location, $log) {

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

      $scope.maxSize = 5;
      $scope.bigTotalItems = 175;
      $scope.bigCurrentPage = 1;

    
  
});
