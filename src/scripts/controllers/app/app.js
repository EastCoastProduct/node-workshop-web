'use strict';

angular.module('workshop-frontend')
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'views/app/app.html'
      }
    );
  }
]);
