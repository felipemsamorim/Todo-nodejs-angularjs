'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.TodoList',
  'myApp.todolistService'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.when('/TodoList', {
    templateUrl: 'TodoList/Template/TodoList.html',
    controller: 'TodoListCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/TodoList'});
}]);
