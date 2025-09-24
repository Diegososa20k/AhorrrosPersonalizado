'use strict';

angular.module('app')
.factory('gastosPendientesFactory', function($resource) {
    return $resource('http://localhost:3000/api/gastosPendientes/:id', { id: '@id' }, {
        'update': { method: 'PUT' },
        'delete': { method: 'DELETE' },
        'post': { method: 'POST' }
    });
});
