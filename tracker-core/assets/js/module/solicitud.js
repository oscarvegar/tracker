var app = angular.module( "track-solicitud", ['ui.router'] );
app.controller( "SolicitudCtrl", function($scope, $http, $rootScope, $location, $log) {

	$rootScope.tituloPagina = "Crear Solicitud";
    $rootScope.iconoPagina = "icon-edit";


    $scope.titulo = "Solicitud de Materiales";
    $scope.pedido= [];
    $scope.pedido.User="Ing. Juan Carlos Pereyra Gonzalez"
    $scope.lista = [];
    $scope.obras= [];


      $http.get('/api/obra/getObras').then(function(res) {
            $scope.obras = res.data;
          
        });


    $scope.direccion = function(no){
                        
        $scope.dire= [];  
        $scope.dire= no.direccion;     
                            
    };

    $scope.agregar = function (p) {
        var itemActual;

        for (var i = 0; i < $scope.lista.length; i++) {
            if ($scope.lista[i].Producto.Id == p.Id) {
                itemActual = $scope.lista[i];
            }
        }

        if (!itemActual) {
            $scope.lista.push({
                Producto: p,
                Cantidad: 100,
                Unidad:p.Unidad
            });
        } else {
            itemActual.Cantidad++;
        }
    }


     $scope.open = function(){
            $('#miSolicitud').modal('show')
            $scope.$apply();
    };
    

    $scope.productos = [{"Id": "1010001", "Producto":  "ALAMBRE RECOCIDO CAL. 16", "Unidad": "KG"},
{"Id": "1010002",  "Producto": "ALAMBRON DE 1/4", "Unidad": "KG"},
{"Id": "1010003",  "Producto": "ALAMBRE GALVANIZADO CAL. 16", "Unidad": "KG"},
{"Id": "1010004",  "Producto": "ANGULO DE ACERO 1 1/2' X 1 1/2' DE 1/4", "Unidad" : "KG"},
{"Id": "1010005",  "Producto": "ANGULO DE ACERO 3/4 X 3/4 DE 1/8", "Unidad" : "KG"},
{"Id": "1010006",  "Producto": "ANGULO DE ACERO 1 X  DE 1/8", "Unidad": "KG"},
{"Id": "1010007",  "Producto": "ANGULO DE ACERO 1 X 1 DE 3/16", "Unidad": "KG"},
{"Id": "1010008",  "Producto": "ANGULO DE ACERO 1 1/4 X 1 1/4 DE1/4", "Unidad": "KG"},
{"Id": "1020001",  "Producto": "VARILLA CORRUGADA DE 3/8 No, 3", "Unidad": "KG"},
{"Id": "1020002",  "Producto": "VARILLA CORRUGADA DE 1/2 No. 4", "Unidad": "KG"},
{"Id": "1020003",  "Producto": "VARILLA CORRUGADA DE 5/8 No. 5", "Unidad": "KG"},
{"Id": "1020004",  "Producto": "VARILLA CORRUGADA DE 3/4 No. 6", "Unidad": "KG"},
{"Id": "1020005",  "Producto": "VARILLA CORRUGADA DE 1 No 8", "Unidad": "KG"},
{"Id": "1020006",  "Producto": "VARILLA CORRUGADA DE 1 1/4 No. 10", "Unidad": "KG"},
{"Id": "1030001",  "Producto": "ADITIVO MEYCO SA 160", "Unidad": "LT"},
{"Id": "1030002",  "Producto": "ADITIVO EXPANSOR Y PLASTIFICANTE", "Unidad": "LT"},
{"Id": "1030003",  "Producto": "ADHESIVO HIT RE 500/330", "Unidad": "PZ"},
{"Id": "1030004",  "Producto": "ADHESIVO PARA JUNTA PREFORMADA", "Unidad": "PZ"},
{"Id": "1030005",  "Producto": "ADITIVO PARA FRAGUADO DE CONCRETO", "Unidad": "LT"},
{"Id": "1030006",  "Producto": "ADITIVO P/ CONCRETO INCORPORADOR DE AIRE", "Unidad": "LT"}

]

   $scope.totalItems = 170;
    $scope.currentPage = 1;

      
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };

      $scope.maxSize = 5;
      $scope.bigTotalItems = 10;
      $scope.bigCurrentPage = 1;

  
});




