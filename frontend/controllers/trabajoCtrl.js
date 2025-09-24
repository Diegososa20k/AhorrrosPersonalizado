'use strict';



angular.module('app')

.controller('trabajoCtrl', function($scope, trabajoFactory, nuFactory, gastosDialogFactory){
    $scope.ahorro = {};
    $scope.trabajos = [];

    $scope.totalAhorro = 0;
    $scope.mostrarNombreCajita = false;
    $scope.mensaje = null;
    $scope.cajitasNu = [];

    function cargarTrabajo() {
        trabajoFactory.query().$promise
        .then(function(data) {
            $scope.trabajos = data;

            // Total de ingresos (ahorros)
            const totalIngresos = data.reduce(function(total, item) {
            return total + parseFloat(item.cantidad || 0);
            }, 0);

            // 🔹 Ahora traemos los gastos asociados SOLO a empanadas
            return gastosDialogFactory.query({ origen: 'trabajo' }).$promise
            .then(function(gastos) {
                const totalGastos = gastos.reduce((t, g) => t + parseFloat(g.cantidad || 0), 0);

                // 🔹 Total final = ingresos - gastos
                $scope.totalAhorro = totalIngresos - totalGastos;
            });
        })
        .catch(function(err) {
            console.error('Error cargando trabajos:', err);
        });
    }


    //Cargar la lista de ahorro de trabajo y calcular el total


        // Cargar lista de cajitas Nu
    function cargarCajitasNu() {
        $scope.cajitasNu = nuFactory.query(function(data) {
            $scope.cajitasNu = data;
        });

    }

     //Guardar los datos

    $scope.guardarAhorro = function(){
        trabajoFactory.save($scope.ahorro, function(){
            $scope.mensaje = {type: 'alert-succes', text: 'ahorroguardado correctamente'}
            $scope.ahorro = {};
            $scope.formAhorro.$setPristine();
            cargarTrabajo();
        }, function(){
            $scope.mensaje = { type: 'alert-danger', text: 'Error al guardar el ahorro'};
        })
    };

    //Mostrarinput de cajita si es Nu
    $scope.onUbicacionChange = function(){
        $scope.mostrarNombreCajita = ($scope.ahorro.ubicacion== 'nu')
        if ($scope.mostrarNombreCajita) {
            cargarCajitasNu();
        }
    }


    


   

      // Cuando el usuario seleccione una cajita del dropdown
    $scope.seleccionarCajita = function(cajita) {
        $scope.ahorro.cajita_id = cajita.id;  // 🔹 Así se envía al backend
    };

    cargarTrabajo();
})