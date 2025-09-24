'use strict';

angular.module('app')

.factory('gastosDialogFactory', function($resource) {
  return $resource('http://localhost:3000/api/gastosDialog/:id', { id: '@id' }, {
    'update': { method: 'PUT' },
    'delete': { method: 'DELETE' },
    'post': { method: 'POST' }
  });
});


