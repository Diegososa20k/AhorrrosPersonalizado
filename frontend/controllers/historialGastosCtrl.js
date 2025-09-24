'use strict';

angular.module('app')
.controller('historialGastosCtrl', function($scope, gastosDialogFactory) {
  $scope.gastos = [];
  $scope.totalGastos = 0;

  // Cargar historial de gastos usando la factory
  gastosDialogFactory.query().$promise
    .then(function(data) {
      $scope.gastos = data;

      // Calcular total gastado
      $scope.totalGastos = $scope.gastos.reduce((sum, g) => sum + parseFloat(g.cantidad || 0), 0);
    })
    .catch(function(err) {
      console.error("Error al cargar historial de gastos:", err);
    });
});
