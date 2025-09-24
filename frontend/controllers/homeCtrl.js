'use strict';

angular.module('app')
.controller('homeCtrl', function($scope, empanadasFactory, trabajoFactory, extrasFactory, gastosDialogFactory) {
  $scope.meta = 250000;       // Meta fija
  $scope.totalEmpanadas = 0;  
  $scope.totalTrabajo = 0;
  $scope.totalExtras = 0;
  $scope.totalGeneral = 0;    
  $scope.porcentaje = 0;      

  function actualizarPorcentaje() {
    $scope.totalGeneral = $scope.totalEmpanadas + $scope.totalTrabajo + $scope.totalExtras;
    $scope.porcentaje = Math.min(($scope.totalGeneral / $scope.meta) * 100, 100);
  }

  // Cargar empanadas con gastos
  function cargarTotalEmpanada() {
    empanadasFactory.query(function(data) {
      const ingresos = data.reduce((total, item) => total + parseFloat(item.cantidad || 0), 0);

      // restar gastos de origen "empanadas"
      gastosDialogFactory.query({ origen: 'empanadas' }, function(gastos) {
        const egresos = gastos.reduce((total, g) => total + parseFloat(g.cantidad || 0), 0);
        $scope.totalEmpanadas = ingresos - egresos;
        actualizarPorcentaje();
      });
    });
  }

  // Cargar trabajo con gastos
  function cargaTotalTrabajo(){
    trabajoFactory.query(function(data){
      const ingresos = data.reduce((total, item) => total + parseFloat(item.cantidad || 0), 0);

      gastosDialogFactory.query({ origen: 'trabajo' }, function(gastos) {
        const egresos = gastos.reduce((total, g) => total + parseFloat(g.cantidad || 0), 0);
        $scope.totalTrabajo = ingresos - egresos;
        actualizarPorcentaje();
      });
    });
  }

  // Cargar extras con gastos
  function cargaTotalExtras(){
    extrasFactory.query(function(data){
      const ingresos = data.reduce((total, item) => total + parseFloat(item.cantidad || 0), 0);

      gastosDialogFactory.query({ origen: 'extras' }, function(gastos) {
        const egresos = gastos.reduce((total, g) => total + parseFloat(g.cantidad || 0), 0);
        $scope.totalExtras = ingresos - egresos;
        actualizarPorcentaje();
      });
    });
  }

  cargarTotalEmpanada();
  cargaTotalTrabajo();
  cargaTotalExtras();
});
