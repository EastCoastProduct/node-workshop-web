'use strict';

angular.module('workshop-frontend')
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('authentication.login', {
        url: '/login',
        templateUrl: 'views/auth/login.html',
        controller: 'LoginCtrl'
      }
    );
  }
])

.controller('LoginCtrl', [
  '$scope',
  '$state',
  'AuthService',
  'Session',
  function($scope, $state, AuthService, Session) {

    $scope.logIn = function(credentials) {
      $scope.logging = true;
      $scope.errLogin = false;

      AuthService.login(credentials).then(function() {
        $state.go('dashboard.user-dashboard', {userId: Session.user._id});
      }, function(err) {
        $scope.errLogin = err.data.message;
      }).finally(function() {
        $scope.logging = false;
      });
    };

  }
]);
