'use strict'

angular.module('app')

.factory('nuFactory', function($resource){
        return $resource('http://localhost:3000/api/nu/:id', { id: '@id' }, {
        'update': { method: 'PUT' },
        'delete': { method: 'DELETE' },
        'post': { method: 'POST' }
    });
})  