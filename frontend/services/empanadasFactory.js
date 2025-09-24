'use strict';

angular.module('app')
/*.factory('empanadasFactory', function($http) {
  var baseUrl = 'http://localhost:3000/api/empanadas';

  return {
    crear: function(data) {
      return $http.post(baseUrl, data);
    },
    listar: function() {
      return $http.get(baseUrl);
    }
  };
});
*/
.factory('empanadasFactory', function($resource) {
  return $resource('http://localhost:3000/api/empanadas/:id', { id: '@id' }, {
    'update': { method: 'PUT' },
    'delete': { method: 'DELETE' },
    'post': { method: 'POST' }
  });
});


