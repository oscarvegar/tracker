var app = angular.module( "track-solicitud", ['ui.router'] );
app.controller( "SolicitudCtrl", function($scope, $http, $rootScope, $location) {

	$rootScope.tituloPagina = "Crear Solicitud";
    $rootScope.iconoPagina = "icon-edit";


    $scope.titulo = "Solicitud de Materiales";
    $scope.pedido= [];
    $scope.pedido.User="Ing. Juan Carlos Pereyra Gonzalez"
    $scope.lista = [];


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
                Cantidad: 1
            });
        } else {
            itemActual.Cantidad++;
        }
    }


     $scope.open = function(){
            $('#miSolicitud').modal('show')
            $scope.$apply();
    };
    

    $scope.productos = [{"Id": "1",  "Producto": "Cemento Apasco Toneladas",  "Imagen": "http://materialeslavena.com/ventas/images/SACO%20APASCO.JPG"},
{"Id": "2",  "Producto": "Varilla 1/2 de pulgada Toneladas",  "Imagen": "http://www.apsaceros.com/1956/img/varilla_1.jpg"},
{"Id": "3",  "Producto": "Varilla de 1/4 de pulgada Toneladas",  "Imagen": "http://www.apsaceros.com/1956/img/varilla_1.jpg"},
{"Id": "4",  "Producto": "Cal Toneladas",  "Imagen": "http://construoreza.com.mx/images/MATERIAL%20CONSTRUCCION/CAL.png"},
{"Id": "6",  "Producto": "Tabique rojo Millar",  "Imagen": "http://www.constructodo.com.mx/upload/productos/acero-estructural/tabique-rojo.jpg"},
{"Id": "7",  "Producto": "Block Millar", "Imagen": "http://docs.engineeringtoolbox.com/documents/1731/concrete_masonry_block.png"},
{"Id": "8",  "Producto": "Arena Camiones",  "Imagen": "http://static.imujer.com/sites/default/files/lasmanualidades/como-preparar-masa-de-arena.jpg"},
{"Id": "9",  "Producto": "Alambron Toneladas",  "Imagen": "http://www.cofiasa.com.mx/wp-content/uploads/2014/09/alambron-e1411752694974.jpg"}

]

  
});




