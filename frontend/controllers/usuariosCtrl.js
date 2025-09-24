// controllers/usuariosCtrl.js
'use strict';

angular.module('app')
.controller('usuariosCtrl', function($scope, usuarioFactory) {
  $scope.usuarios = [];

  $scope.nuevoUsuario = { nombre: '', correo: '' }; //para la primera fila
  $scope.filasDinamicas = [];  // Para las filas extra


  $scope.agregarCampoFila = function() {
    $scope.filasDinamicas.push({ nombre: '', correo: '' });
  };

    $scope.obtenerUsuarios = function() {
    usuarioFactory.query().$promise
      .then(function(data) {
        $scope.usuarios = data;
      })
      .catch(function(error) {
        console.error('Error al obtener usuarios:', error);
      });
  };

  // Obtener usuarios desde la API
  /*usuarioFactory.query().$promise.then(function(data) {
    console.log(data, "DATA")
    $scope.usuarios = data;
  }).catch(function(err) {
    console.error('Error al obtener usuarios:', err);
  });*/

  
  // Cargar los usuarios al iniciar
  $scope.obtenerUsuarios();

  // Eliminar un usuario
  $scope.eliminarUsuario = function(id) {
    console.log(id,"Se ejecuta eliminar?")
    
      usuarioFactory.delete({ id: id }).$promise
        .then(function() {
          // Recargar lista después de eliminar
          $scope.obtenerUsuarios();
        })
        .catch(function(error) {
          console.error('Error al eliminar usuario:', error);
        });
    
  };

$scope.guardarUsuarios = function() {
  const todos = [];

  // Agrega la fila principal si está completa
  if ($scope.nuevoUsuario.nombre && $scope.nuevoUsuario.correo.includes('@')) {
    todos.push(angular.copy($scope.nuevoUsuario));
  }

  // Agrega las filas dinámicas si están completas
  $scope.filasDinamicas.forEach(f => {
    if (f.nombre && f.correo.includes('@')) {
      todos.push(angular.copy(f));
    }
  });

  // Enviar cada uno por POST
  todos.forEach(usuario => {
    usuarioFactory.save(usuario).$promise
      .then(function(response) {
        console.log("✅ Usuario guardado:", response);
        $scope.obtenerUsuarios();
      })
      .catch(function(error) {
        console.error("❌ Error al guardar usuario:", error);
      });
  });

  // Limpiar formularios
  $scope.nuevoUsuario = { nombre: '', correo: '' };
  $scope.filasDinamicas = [];
};

$scope.verUsuario = function(usuario) {
  console.log("👁️ Ver usuario:", usuario);
  // Aquí podríamos abrir un modal o redirigir a una nueva vista con más detalle
};


});
