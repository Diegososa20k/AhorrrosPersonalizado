// app.js
'use strict';


//ngResource es para que cargue resours que tiene en factory
angular.module('app', ['ui.router', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
    })

    .state('acerca', {
      url: '/acerca',
      templateUrl: 'views/acerca.html',
      controller: 'acercaCtrl'
    })
    .state('usuarios', {
        url: '/usuarios',
        templateUrl: 'views/usuarios.html',
        controller: 'usuariosCtrl'
    })

    .state('verUsuario', {
        url: '/usuarios/ver/:id',
        templateUrl: 'views/verUsuario.html',
        controller: 'verUsuarioCtrl'
    })

    .state('nacimientoUsuarios', {
        url: '/nacimientoUsuarios',
        templateUrl: 'views/nacimientoUsuarios.html',
        controller: 'nacimientoUsuariosCtrl'
    })

    .state('empanadas', {
        url: '/empanadas',
        templateUrl: 'views/empanadas.html',
        controller: 'empanadasCtrl'

    })

    .state('trabajo', {
        url: '/trabajo',
        templateUrl: 'views/trabajo.html',
        controller: 'trabajoCtrl'
    })

    .state('nu', {
      url: '/nu',
      templateUrl: 'views/nuCajitas.html',
      controller: 'nuCtrl'
    })

    .state('crypto', {
        url: '/crypto',
        templateUrl: 'views/crypto.html',
        controller: 'cryptoCtrl'
    })

    .state('extras', {
      url: '/extras',
      templateUrl: 'views/extras.html',
      controller: 'extraCtrl'
    })

    .state('gastos', {
      url: '/gastos/:tipo',   // el :tipo puede ser "empanadas", "trabajo", "extras"
      templateUrl: 'views/gastosDialog.html',
      controller: 'gastosDialogCtrl'
    })

    .state('historial', {
      url: '/historial',
      templateUrl: 'views/historialGasto.html',
      controller: 'historialGastosCtrl'
    })

    .state('gastosPendientes', {
      url: '/gastosPendientes',
      templateUrl: 'views/gastosPendientes.html',
      controller: 'gastosPendientesCtrl'
    })

    .state('dineroOtros', {
      url: '/dineroOtrasPersonas',
      templateUrl: 'views/dinero_otras_personas.html',
      controller: 'dineroOtrasPersonasCtrl'
    })

    

});
