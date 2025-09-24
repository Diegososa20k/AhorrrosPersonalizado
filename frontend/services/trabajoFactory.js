'use strict';

angular.module('app')

.factory('trabajoFactory', function($resource){
    return $resource('http://localhost:3000/api/trabajo/:id', {id: '@id'},{
    'update': { method: 'PUT' },
    'delete': { method: 'DELETE' },
    'post': { method: 'POST' }
    })
})