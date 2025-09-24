'use strict';

angular.module('app')
.controller('nacimientoUsuariosCtrl', function($scope, usuarioFactory) {

  $scope.anioSeleccionado = '1999';
  $scope.usuarios = [];
  $scope.usuariosFiltrados = [];

  $scope.obtenerUsuarios = function() {
    usuarioFactory.query().$promise
      .then(function(data) {
        $scope.usuarios = data;
        $scope.filtrarPorAnio(); // Filtrar inmediatamente con el año por defecto
      })
      .catch(function(error) {
        console.error('Error al obtener usuarios:', error);
      });
  };

  $scope.filtrarPorAnio = function() {
    if ($scope.anioSeleccionado === 'todos') {
      $scope.usuariosFiltrados = $scope.usuarios;
    } else {
      $scope.usuariosFiltrados = $scope.usuarios.filter(function(usuario) {
        return usuario.fecha && usuario.fecha.startsWith($scope.anioSeleccionado);
      });
    }
  };

  // Al iniciar
  $scope.obtenerUsuarios();
});
