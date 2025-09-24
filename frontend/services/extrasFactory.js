'use strict';

angular.module('app')

.factory('extrasFactory', function($resource) {
  return $resource('http://localhost:3000/api/extras/:id', { id: '@id' }, {
    'update': { method: 'PUT' },
    'delete': { method: 'DELETE' },
    'post': { method: 'POST' }
  });
});

