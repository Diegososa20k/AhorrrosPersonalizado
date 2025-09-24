// controllers/cryptoCtrl.js
'use strict';

angular.module('app')
.controller('cryptoCtrl', function($scope, $http) {
  $scope.price = "Cargando...";

  $scope.getPrice = function() {
    $http.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
      .then(function(response) {
        $scope.price = parseFloat(response.data.price).toFixed(2);
      })
      .catch(function(error) {
        console.error("Error obteniendo precio:", error);
        $scope.price = "Error al cargar";
      });
  };

  // Llamar automáticamente al cargar la vista
  $scope.getPrice();
});
