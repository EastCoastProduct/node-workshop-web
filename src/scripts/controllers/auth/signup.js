'use strict';

angular.module('workshop-frontend')
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'views/auth/signup.html',
        controller: 'SignupCtrl'
      }
    );
  }
])

.controller('SignupCtrl', [
  '$scope',
  '$state',
  'AuthService',
  'Session',
  function($scope, $state, AuthService, Session) {

    $scope.signUp = function(credentials) {
      $scope.errSignup = false;
      $scope.signing = true;

      AuthService.signup(credentials).then(function() {
        $state.go('dashboard.user-dashboard', {userId: Session.user._id});
      }, function(err) {
        $scope.errSignup = err.data.message;
      }).finally(function() {
        $scope.signing = false;
      });
    };

  }
]);
