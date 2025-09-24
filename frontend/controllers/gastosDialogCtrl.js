'use strict';

angular.module('app')
.controller('gastosDialogCtrl', function($scope, $stateParams, $state, gastosDialogFactory, empanadasFactory, trabajoFactory, extrasFactory, nuFactory, dineroOtrasPersonasFactory) {

  // --- Estado / origen ---
  $scope.tipoVista = $stateParams.tipo; // 'empanadas' | 'trabajo' | 'extras'
  const vistaMap = { empanadas: 'empanadas', trabajo: 'trabajo', extras: 'extras', dineroOtros: 'dineroOtros'     };
  $scope.vistaOrigen = vistaMap[$scope.tipoVista] || 'empanadas';

  // --- Totales del origen ---
  $scope.totalAhorro = 0;
  $scope.movimientos = [];        // ingresos (de la vista)
  $scope.gastosRegistrados = [];  // gastos (de la vista)

function factoryPorTipo() {
  return ($scope.tipoVista === 'empanadas') ? empanadasFactory
       : ($scope.tipoVista === 'trabajo') ? trabajoFactory
       : ($scope.tipoVista === 'extras') ? extrasFactory
       : ($scope.tipoVista === 'dineroOtros') ? dineroOtrasPersonasFactory
       : empanadasFactory; // fallback por si no coincide
}


  function cargarAhorros() {
    // 1) Trae ingresos de esta vista
    return factoryPorTipo().query().$promise
      .then(function(data) {
        $scope.movimientos = data;
        const totalIngresos = data.reduce((acc, it) => acc + parseFloat(it.cantidad || 0), 0);

        // 2) Trae gastos SOLO de esta vista
        return gastosDialogFactory.query({ origen: $scope.tipoVista }).$promise
          .then(function(gastos) {
            $scope.gastosRegistrados = gastos;
            const totalGastos = gastos.reduce((acc, g) => acc + parseFloat(g.cantidad || 0), 0);

            // 3) Total final = ingresos - gastos
            $scope.totalAhorro = totalIngresos - totalGastos;
          });
      })
      .catch(function(err) {
        console.error('Error cargando ahorros del origen:', err);
      });
  }

  // --- Cajitas Nu ---
  $scope.cajitasNu = [];
  function cargarCajitasNu() {
    nuFactory.query().$promise
      .then(function(data) { $scope.cajitasNu = data; })
      .catch(function(err) { console.error('Error cargando cajitas Nu:', err); });
  }

  // --- Formulario de gasto ---
  $scope.gasto = {
    cantidad: null,
    fecha: new Date(),
    ubicacion: 'otro',
    cajita_id: null,
    concepto: '',
    descripcion: '',
    origen: $scope.tipoVista, // <- clave
    origen_ahorro: $scope.tipoVista
  };

  $scope.mostrarNombreCajita = false;
  $scope.mensaje = null;

  $scope.onUbicacionChange = function() {
    $scope.mostrarNombreCajita = ($scope.gasto.ubicacion === 'nu');
    if ($scope.mostrarNombreCajita) cargarCajitasNu();
    else $scope.gasto.cajita_id = null;
  };

  $scope.guardarGasto = function() {
    const payload = angular.copy($scope.gasto);

    if (payload.fecha instanceof Date) {
      payload.fecha = payload.fecha.toISOString().slice(0, 10); // YYYY-MM-DD
    }
    if (payload.ubicacion !== 'nu') payload.cajita_id = null;

    gastosDialogFactory.save(payload).$promise
      .then(function(res) {
        $scope.mensaje = { type: 'alert-success', text: 'Gasto guardado correctamente' };

        // 1) refresca gastos + total sin recargar la página
        return cargarAhorros();
      })
      .then(function() {
        // 2) limpiar form (pero OJO: mantenemos origen)
        $scope.gasto = {
          cantidad: null,
          fecha: new Date(),
          ubicacion: 'otro',
          cajita_id: null,
          concepto: '',
          descripcion: '',
          origen: $scope.tipoVista,
          origen_ahorro: $scope.tipoVista  // nuevo campo: igual al tipo de vista
        };
        $scope.formGasto.$setPristine();
        $scope.formGasto.$setUntouched();
      })
      .catch(function(err) {
        console.error('Error guardando gasto:', err);
        $scope.mensaje = { type: 'alert-danger', text: 'Error al guardar el gasto' };
      });
  };

  // Volver dinámico
  $scope.volver = function() {
    $state.go($scope.vistaOrigen);
  };

  // Init
  cargarAhorros();
});
