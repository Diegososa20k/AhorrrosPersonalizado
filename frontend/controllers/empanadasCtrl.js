'use strict';

angular.module('app')
.controller('empanadasCtrl', function($scope, empanadasFactory, gastosDialogFactory, nuFactory) {

  $scope.ahorro = {};
  $scope.empanadas = [];
  $scope.totalAhorro = 0;
  $scope.mostrarNombreCajita = false;
  $scope.mensaje = null;
  $scope.cajitasNu = [];

  // 🔹 Cargar lista de empanadas y calcular total (ingresos - gastos)
  function cargarEmpanadas() {
    empanadasFactory.query().$promise
      .then(function(data) {
        $scope.empanadas = data;

        // Total de ingresos (ahorros)
        const totalIngresos = data.reduce(function(total, item) {
          return total + parseFloat(item.cantidad || 0);
        }, 0);

        // 🔹 Ahora traemos los gastos asociados SOLO a empanadas
        return gastosDialogFactory.query({ origen: 'empanadas' }).$promise
          .then(function(gastos) {
            const totalGastos = gastos.reduce((t, g) => t + parseFloat(g.cantidad || 0), 0);

            // 🔹 Total final = ingresos - gastos
            $scope.totalAhorro = totalIngresos - totalGastos;
          });
      })
      .catch(function(err) {
        console.error('Error cargando empanadas:', err);
      });
  }

  // Cargar lista de cajitas Nu
  function cargarCajitasNu() {
    nuFactory.query().$promise
      .then(function(data) { $scope.cajitasNu = data; })
      .catch(function(err) { console.error('Error cargando cajitas Nu:', err); });
  }

  // Guardar nuevo ahorro
  $scope.guardarAhorro = function() {
    empanadasFactory.save($scope.ahorro).$promise
      .then(function() {
        $scope.mensaje = { type: 'alert-success', text: 'Ahorro guardado correctamente' };
        $scope.ahorro = {};
        $scope.formAhorro.$setPristine();
        cargarEmpanadas(); // 🔹 recalcular total con gastos incluidos
      })
      .catch(function() {
        $scope.mensaje = { type: 'alert-danger', text: 'Error al guardar el ahorro' };
      });
  };

  // Mostrar input extra si ubicación = "nu"
  $scope.onUbicacionChange = function() {
    $scope.mostrarNombreCajita = ($scope.ahorro.ubicacion === 'nu');
    if ($scope.mostrarNombreCajita) cargarCajitasNu();
  };

  // Cuando el usuario seleccione una cajita del dropdown
  $scope.seleccionarCajita = function(cajita) {
    $scope.ahorro.cajita_id = cajita.id;
  };

  // Inicializar datos
  cargarEmpanadas();
});
