'use strict';

var aqueductsApp = angular.module('webApp');
aqueductsApp.controller('ProductController', ['$scope', '$routeParams', '$location','Restangular', 'Tryfer', function($scope, $routeParams, $location, Restangular, Tryfer, product) {

    var headers = {};
    var trace = Tryfer.initTrace(headers);
    $scope.trace = trace;
    trace.clientSend();

    var product_id = $routeParams.product;
    var product = Restangular.one('products', product_id).get();

    $scope.product = product;
    var products = Restangular.all('products');

    products.getList({}, trace.getHeaders()).then(function(products) {
      $scope.products = products ;
      var productsString = products.map(function(item) { return item.id; }).join(',').toString();
      trace.record('string', 'all:products', productsString);
      trace.clientReceive();
    });

    $scope.create = function(product){
      products.post(product).then(function(product) {
        $scope.products.push(product);
      });
    };

    $scope.update = function(product){
      product.put();
    };

    $scope.destroy = function(product) {
      product.remove();
    };
}]);
