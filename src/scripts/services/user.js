'use strict';

angular.module('workshop-frontend')
.factory('UserService', [
  '$http',
  'Session',
  'CONFIG',
  function($http, Session, CONFIG) {
    var userService = {};

    userService.update = function(id, data) {
      return $http.post(CONFIG.apiUrl + '/users/' + id, data)
        .then(function(resp) {
          Session.set(resp.data);
          return resp.data;
        });
    };

    userService.add = function(data, code) {
      if (code) {
        return $http.post(CONFIG.apiUrl + '/users', data, { params: code });
      }
      return $http.post(CONFIG.apiUrl + '/users', data);
    };

    userService.get = function(id) {
      if (id) {
        return $http.get(CONFIG.apiUrl + '/users/' + id);
      }
      return $http.get(CONFIG.apiUrl + '/users/me');
    };

    userService.authenticate = function(credentials) {
      return $http.post(CONFIG.apiUrl + '/authenticate', credentials);
    };

    return userService;
  }
]);
