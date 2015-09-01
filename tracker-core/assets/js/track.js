/**
 * Created by oscar on 5/04/15.
 */
var app = angular.module( "TrackApp", ['ui.router','ui.bootstrap','LoginApp','track-dashboard','track-solicitud','track-reporte'] );

app.controller("TrackController", function($scope, $http, $rootScope, $location) {
  $rootScope.tituloPagina = "Live Dashboard";
  $rootScope.iconoPagina = "icon-rss-sign";
});


app.config(function( $stateProvider, $urlRouterProvider, $locationProvider ){
  
  $urlRouterProvider.otherwise('dashboard');
 $stateProvider
 .state('dashboard',{
        url: '/',
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      state('solicitud',{
        url:'/solicitud',
        templateUrl: 'templates/solicitud.html',
        controller: 'SolicitudCtrl'
      })
  .state('unauthorized',{
    url: '/unauthorized',
    templateUrl: 'templates/forbidden.html'
  })
  .state('reporte',{
    url: '/reporte',
    templateUrl: 'templates/reporte.html',
    controller: 'ReporteCtrl'
  })
  .state('detalle',{
    url: '/detalle',
    templateUrl: 'templates/detalle.html'
  })
  .state('detalle1',{
    url: '/detalle1',
    templateUrl: 'templates/detalle1.html'
  })
  .state('detalle2',{
    url: '/detalle2',
    templateUrl: 'templates/detalle2.html'
  })
  .state('detalle3',{
    url: '/detalle3',
    templateUrl: 'templates/detalle3.html'
  })
  .state('detalle4',{
    url: '/detalle4',
    templateUrl: 'templates/detalle4.html'
  })
  .state('detalle5',{
    url: '/detalle5',
    templateUrl: 'templates/detalle5.html'
  });

  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});

});

app.directive('onlyDigits', function () {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function (scope, element, attr, ctrl) {
      function inputValue(val) {
        if (val) {
          var digits = val.replace(/[^0-9]/g, '');

          if (digits !== val) {
            ctrl.$setViewValue(digits);
            ctrl.$render();
          }
          return parseInt(digits,10);
        }
        return undefined;
      }
      ctrl.$parsers.push(inputValue);
    }
  };
});

app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter, {'event': event});
        });

        event.preventDefault();
      }
    });
  };
});

app.directive('validNumberFloat', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return;
      }
      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
          var val = '';
        }
        var clean = val.replace(/[^0-9\.]/g, '');
        var decimalCheck = clean.split('.');

        if(!angular.isUndefined(decimalCheck[1])) {
          decimalCheck[1] = decimalCheck[1].slice(0,2);
          clean =decimalCheck[0] + '.' + decimalCheck[1];
        }

        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});
