angular.
  module('myApp.todolistService', ['ngResource']).
  factory('Todo', ['$resource','$http',
    function ($resource,$http) {
      return {
        base: $resource('http://localhost:3000/api/todoitems/:id', {}, {
          get: {
            method: 'GET',
            isArray: true
          },
          query: {
            method: 'GET',
            isArray: true
          },
          save: { method: 'POST' },
          update: {
            method: 'POST',
          },
          delete: { method: 'DELETE', params: { id: 'todoitems' } },
        }),
        concluir:
          $resource('http://localhost:3000/api/todoitems/concluir/:id', {}, {
            get: {
              method: 'GET',
              params: { id: 'concluir' },
              isArray: true
            }
          }),
          reabrir: function(obj,success,error){
            $http.get('http://localhost:3000/api/todoitems/reabrir/'+obj.id,{
              method:'GET',
              headers: {'Authorization': obj.auth},
            }).then(function(data){return success(data)}, function(err){return error(err)});
          }
          ,
          randominsert: function(success,error){
            $http.get('http://localhost:3000/api/randominsert/')
            .then(function(data){return success(data)}, function(err){return error(err)});
          }
      }
    }
  ]);