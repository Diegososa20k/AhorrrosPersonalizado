'use strict';

angular.module('app')
.controller('gastosPendientesCtrl', function($scope, gastosPendientesFactory) {

    $scope.nuevoGasto = {};          // formulario
    $scope.gastos = [];               // gastos originales desde DB
    $scope.gastosExpandido = [];      // gastos mostrados por fila
    // Array de meses en español
$scope.mesesNombre = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Guardamos los checks fuera de $scope
let estadoChecks = {};


// Función para obtener el mes en letras
$scope.mesEnLetras = function(fecha) {
  if (!fecha) return '';
  const d = new Date(fecha);
  return $scope.mesesNombre[d.getMonth()]; // getMonth() devuelve 0-11
};
    // Cargar gastos
    function cargarGastos() {
        gastosPendientesFactory.query().$promise.then(function(data){
            $scope.gastos = data;
            expandirGastos();
        });
    }



    // Guardar nuevo gasto
    $scope.guardarGasto = function() {
        if (!$scope.nuevoGasto.nombre || !$scope.nuevoGasto.total || !$scope.nuevoGasto.fecha_pago) return;

        $scope.nuevoGasto.meses = $scope.nuevoGasto.meses && $scope.nuevoGasto.meses > 0 ? $scope.nuevoGasto.meses : 1;
        $scope.nuevoGasto.listo = false;

        gastosPendientesFactory.save($scope.nuevoGasto).$promise
        .then(function(){
            $scope.nuevoGasto = {}; // limpiar formulario
            cargarGastos();          // recargar lista
        })
        .catch(function(err){
            console.error('Error guardando gasto:', err);
        });
    };

    // Crear filas duplicadas por mes



// Toggle check independiente
$scope.toggleListo = function(fila) {
    fila.listoFila = !fila.listoFila;
    // Actualizar gasto original solo si quieres reflejar en DB
    if (fila.listoFila) {
        let gastoOriginal = $scope.gastos.find(g => g.id === fila.gastoId);
        if (gastoOriginal) {
            gastoOriginal.listo = true;
            gastosPendientesFactory.update({ id: gastoOriginal.id }, gastoOriginal);
        }
    }
};

 

    // Eliminar gasto
    $scope.eliminarGasto = function(fila) {
  gastosPendientesFactory.delete({ id: fila.gastoId }, function(){
    guardarEstadoChecks();  // guardamos antes de recargar
    cargarGastos();
  });
};


    // Mostrar pago mensual
    $scope.pagoMensual = function(fila) {
        return fila.pagoMensual;
    };

    // Filtro global para buscar en nombre, descripción o fecha
$scope.filtroGlobal = function(item) {
  if (!$scope.busquedaGlobal) return true; // si no hay búsqueda, mostrar todo

  const texto = $scope.busquedaGlobal.toLowerCase();

  // Comparar nombre y descripción
  const nombreCoincide = item.nombre.toLowerCase().includes(texto);
  const descripcionCoincide = item.descripcion && item.descripcion.toLowerCase().includes(texto);
  
    // Comparar mes en letras
  const mesCoincide = item.fecha_pago && $scope.mesEnLetras(item.fecha_pago).toLowerCase().includes(texto);

  // Comparar fecha (convertimos a string dd/MM/yyyy)
  const fechaCoincide = item.fecha_pago && (new Date(item.fecha_pago).toLocaleDateString().includes(texto));

  return nombreCoincide || descripcionCoincide || fechaCoincide || mesCoincide;
};

  $scope.todosListos = function(gastoId) {
  const filas = $scope.gastosExpandido.filter(f => f.gastoId === gastoId);
  return filas.length > 0 && filas.every(f => f.listoFila);

};



    cargarGastos();


    // Abrir modal
$scope.abrirDialogAbono = function() {
  $scope.abono = { gastoId: null, monto: null };
  var modal = new bootstrap.Modal(document.getElementById('modalAbono'));
  modal.show();
};

$scope.guardarAbono = function() {
  if (!$scope.abono.gastoId || !$scope.abono.monto) return;

  let gasto = $scope.gastos.find(g => g.id === $scope.abono.gastoId);
  if (!gasto) return;

  gasto.abono = (parseFloat(gasto.abono) || 0) + parseFloat($scope.abono.monto);

  gastosPendientesFactory.update({ id: gasto.id }, gasto,
    function(res) {
      console.log("Abono guardado con éxito", res);
      cargarGastos();

      // Cerrar modal
      var modalEl = document.getElementById('modalAbono');
      var modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.hide();
    },
    function(err) {
      console.error("Error al guardar abono:", err);
    }
  );
};


// Antes de recargar gastos
function guardarEstadoChecks() {
  estadoChecks = {};
  $scope.gastosExpandido.forEach(f => {
    estadoChecks[f.filaId] = f.listoFila;
  });
}

// Luego, cuando expandes gastos, restauras el estado
function expandirGastos() {
  const viejoEstado = estadoChecks; // copia de estado previo
  $scope.gastosExpandido = [];

  $scope.gastos.forEach(g => {
    let meses = g.meses && g.meses > 0 ? g.meses : 1;
    const fechaOriginal = new Date(g.fecha_pago);

    for (let i = 0; i < meses; i++) {
      let fechaPago = new Date(fechaOriginal);
      fechaPago.setMonth(fechaPago.getMonth() + i);

      const filaId = g.id + '-' + (i + 1);

      $scope.gastosExpandido.push({
        filaId: filaId,
        gastoId: g.id,
        nombre: g.nombre,
        total: g.total,
        descripcion: g.descripcion,
        fecha_pago: fechaPago,
        pagoMensual: (g.total / meses).toFixed(2),
        mesActual: i + 1,
        listoFila: viejoEstado[filaId] || false  // restaurar check
      });
    }
  });
}




});
