'use strict';

var aqueductsApp = angular.module('webApp');

aqueductsApp.value('EventsApiBaseUrl', 'http://api.aqueducts.baidu.com/v1/');
aqueductsApp.config(['$routeProvider', 'RestangularProvider', '$httpProvider', 'TryferProvider', function($routeProvider, RestangularProvider, $httpProvider, TryferProvider) {
    RestangularProvider.setBaseUrl('http://api.aqueducts.baidu.com/v2/');
    // FOR tryfer
    TryferProvider.setRestkin('http://localhost:6956/v1.0/trace');
    TryferProvider.setName('AQUI');
    TryferProvider.setHost({
      'ipv4': '127.0.0.1',
      'port': 9000,
      'service_name': 'aqueduct:ui'
    });
    TryferProvider.setSampleRate(1);
    TryferProvider.setProduct('aqueducts');



    RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Headers': '*'
    });
    RestangularProvider.setDefaultHttpFields({
      'withCredentials': true
    });
    RestangularProvider.setRequestInterceptor(function(elem, operation) {
      if (operation === 'remove') {
        return null;
      }
      return elem;
    });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
}]);
