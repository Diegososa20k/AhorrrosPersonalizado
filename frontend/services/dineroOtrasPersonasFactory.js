'use strict';

angular.module('app')
.factory('dineroOtrasPersonasFactory', function($resource) {
  return $resource('http://localhost:3000/api/dinero_otras_personas/:id', { id: '@id' }, {
    'update': { method: 'PUT' },
    'delete': { method: 'DELETE' },
    'post': { method: 'POST' }
  });
});
