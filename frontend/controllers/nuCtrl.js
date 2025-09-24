'use strict'

angular.module('app')
.controller('nuCtrl', function($scope, nuFactory){
    $scope.nu = {}
    $scope.nombre = ''
    $scope.usuario = ''
    $scope.cajitas = []

    function cargarCajitasNu(){
        console.log('seuso')
        $scope.cajitas = nuFactory.query(function(data){
        })
    };

    $scope.guardarCajita = function(){
        nuFactory.save($scope.nu, function(){
            $scope.nu = {}; // limpiar formulario
            
            cargarCajitasNu();
        });
    };

    cargarCajitasNu()
})