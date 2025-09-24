'use strict';

angular.module('app')
.controller('extraCtrl', function($scope, extrasFactory, nuFactory, gastosDialogFactory) {

  $scope.ahorro = {};
  $scope.extras = [];
  $scope.totalAhorro = 0;
  $scope.mostrarNombreCajita = false;
  $scope.mensaje = null;
  $scope.concepto = "";
  $scope.cajitasNu = [];

  $scope.totalesPorConcepto = {};

// Calcular totales por concepto y por ubicación
function calcularTotalesPorConcepto(extras, gastos) {
  $scope.totalesPorConcepto = {};
  

  // 1. Sumar ingresos por concepto y ubicación
  extras.forEach(item => {
    const concepto = item.concepto || 'Otro';
    const ubicacion = item.ubicacion || 'Otro';

    // Si no existe el concepto, inicializamos
    if (!$scope.totalesPorConcepto[concepto]) {
      $scope.totalesPorConcepto[concepto] = {
        total: 0,
        ubicaciones: { nu: 0, efectivo: 0, otro: 0 }
      };
    }

    const cantidad = parseFloat(item.cantidad || 0);

    // Sumamos al total general
    $scope.totalesPorConcepto[concepto].total += cantidad;

    // Sumamos al detalle por ubicación
    if (!$scope.totalesPorConcepto[concepto].ubicaciones[ubicacion]) {
      $scope.totalesPorConcepto[concepto].ubicaciones[ubicacion] = 0;
    }
    $scope.totalesPorConcepto[concepto].ubicaciones[ubicacion] += cantidad;
  });

  // 2. Restar gastos por concepto y ubicación (si aplica)
  gastos.forEach(g => {
    if (g.concepto) {
      const concepto = g.concepto || 'Otro';
      const ubicacion = g.ubicacion || 'Otro';

      if (!$scope.totalesPorConcepto[concepto]) {
        $scope.totalesPorConcepto[concepto] = {
          total: 0,
          ubicaciones: { nu: 0, efectivo: 0, otro: 0 }
        };
      }

      const cantidad = parseFloat(g.cantidad || 0);

      $scope.totalesPorConcepto[concepto].total -= cantidad;
      console.log($scope.totalesPorConcepto,'totales')

      if (!$scope.totalesPorConcepto[concepto].ubicaciones[ubicacion]) {
        $scope.totalesPorConcepto[concepto].ubicaciones[ubicacion] = 0;
      }
      $scope.totalesPorConcepto[concepto].ubicaciones[ubicacion] -= cantidad;
    }
  });
}




  

  // Cargar lista de empanadas y calcular total
   function cargarExtras() {
        extrasFactory.query().$promise
        .then(function(data) {
            $scope.extras = data;
          

            // Total de ingresos (ahorros)
            const totalIngresos = data.reduce(function(total, item) {
            return total + parseFloat(item.cantidad || 0);
            }, 0);

            // 🔹 Ahora traemos los gastos asociados SOLO a empanadas
            return gastosDialogFactory.query({ origen: 'extras' }).$promise
            .then(function(gastos) {
                const totalGastos = gastos.reduce((t, g) => t + parseFloat(g.cantidad || 0), 0);

                // 🔹 Total final = ingresos - gastos
                $scope.totalAhorro = totalIngresos - totalGastos;
                calcularTotalesPorConcepto(data, gastos);
            });
        })
        .catch(function(err) {
            console.error('Error cargando extras:', err);
        });
    }




    // Cargar lista de cajitas Nu
  function cargarCajitasNu() {
    $scope.cajitasNu = nuFactory.query(function(data) {
        $scope.cajitasNu = data;
    });

  }

  // Guardar nuevo ahorro
$scope.guardarAhorro = function() {
  extrasFactory.save($scope.ahorro, function() {
    $scope.mensaje = { type: 'alert-success', text: 'Ahorro guardado correctamente' };
    $scope.ahorro = {};
    $scope.formAhorro.$setPristine();
    cargarExtras();
  }, function() {
    $scope.mensaje = { type: 'alert-danger', text: 'Error al guardar el ahorro' };
  });
};


  // Mostrar input extra si ubicación = "nu"
  $scope.onUbicacionChange = function() {
    $scope.mostrarNombreCajita = ($scope.ahorro.ubicacion === 'nu');
    if ($scope.mostrarNombreCajita) {
      cargarCajitasNu();
    }
  };

  // Cuando el usuario seleccione una cajita del dropdown
$scope.seleccionarCajita = function(cajita) {
  $scope.ahorro.cajita_id = cajita.id;  // 🔹 Así se envía al backend
};

  // Inicializar datos
  cargarExtras();
});
