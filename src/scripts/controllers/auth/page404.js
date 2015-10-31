'use strict';

angular.module('workshop-frontend')
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('authentication.page404', {
        url: '/404',
        templateUrl: 'views/auth/page404.html'
      }
    );
  }
]);
