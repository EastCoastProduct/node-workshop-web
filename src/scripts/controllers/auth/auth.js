'use strict';

angular.module('workshop-frontend')
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('authentication', {
        abstract: true,
        templateUrl: 'views/auth/auth.html'
      }
    );

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/404');
    $locationProvider.html5Mode(true);
  }
]);
