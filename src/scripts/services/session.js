'use strict';

angular.module('workshop-frontend')
.service('Session', [
  '$localStorage',
  'lodash',
  function($localStorage, lodash) {

    this.init = function() {
      this.user = $localStorage.user || {};
    };

    this.set = function(user) {
      this.user = lodash.merge(this.user, user);
      $localStorage.user = this.user;
    };

    this.destroy = function() {
      this.user = {};
      $localStorage.$reset();
    };

    this.init();

  }
]);
