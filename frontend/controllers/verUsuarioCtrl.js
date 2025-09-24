// controllers/verUsuarioCtrl.js
'use strict';

angular.module('app')
.controller('verUsuarioCtrl', function($scope, $stateParams, usuarioFactory) {
  $scope.usuario = null;

  usuarioFactory.get({ id: $stateParams.id }).$promise
    .then(function(data) {
      $scope.usuario = data;
    })
    .catch(function(err) {
      console.error('Error al cargar el usuario:', err);
    });
});
