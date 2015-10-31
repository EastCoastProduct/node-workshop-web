'use strict';

angular.module('workshop-frontend')
.factory('ApplicationService', [
  '$rootScope',
  '$localStorage',
  '$http',
  '$state',
  'Session',
  'BROADCAST_EVENTS',
  function($rootScope, $localStorage, $http, $state, Session,
    BROADCAST_EVENTS) {

    var applicationService = {};

    applicationService.run = function() {
      Session.init();

      $http.defaults.headers.common.Authorization =
        'Bearer ' + $localStorage.token;

      $rootScope.$on(BROADCAST_EVENTS.notAuthenticated, function() {
        $state.transitionTo('authentication.login');
      });

      $rootScope.$on(BROADCAST_EVENTS.notFound, function() {
        $state.transitionTo('authentication.page404');
      });
    };

    return applicationService;

  }
]);
