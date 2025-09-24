// services/usuarioFactory.js
/*'use strict';

angular.module('app')
.factory('usuarioFactory', function($resource) {
  return $resource('http://localhost:3000/api/usuarios/:id', { id: '@id' }, {
    'update': { method: 'PUT' },
    'delete': { method: 'DELETE' },
    'post': {method: 'POST'}
  });
});
*/

// services/usuarioFactory.js
//Esto es lo mismo que arriba, solo se pone el put, para que cargue segun lo de verusuarios
'use strict';

angular.module('app')
.factory('usuarioFactory', function($resource) {
  return $resource('http://localhost:3000/api/usuarios/:id', { id: '@id' }, {
    'update': { method: 'PUT' },
    'delete': { method: 'DELETE' },
    'post': { method: 'POST' }
  });
});
