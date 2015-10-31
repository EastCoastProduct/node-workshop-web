'use strict';

angular.module('workshop-frontend')
.factory('AuthService', [
  '$http',
  '$localStorage',
  '$state',
  'lodash',
  'Session',
  'UserService',
  function($http, $localStorage, $state, lodash, Session, UserService) {
    var authService = {};

    authService.login = function(credentials) {
      var getToken = function() {
        return UserService.authenticate(credentials)
          .then(function(resp) {
            var token = resp.data.token;
            $localStorage.token = token;
            $http.defaults.headers.common.Authorization =
              'Bearer ' + token;
            return resp.data.token;
          });
      };

      var getUser = function(token) {
        return UserService.get()
          .then(function(resp) {
            resp.data.token = token;
            Session.set(resp.data);
            return resp.data;
          });
      };

      return getToken().then(getUser);
    };

    authService.logout = function() {
      delete $http.defaults.headers.common.Authorization;
      Session.destroy();
    };

    authService.signup = function(credentials) {
      return UserService.add(credentials)
        .then(function() {
          return authService.login(credentials);
        });
    };

    return authService;
  }
]
);
