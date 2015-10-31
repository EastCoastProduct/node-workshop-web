'use strict';

angular.module('workshop-frontend', [
  'ui.router',
  'ngStorage',
  'ngLodash'
])

.config([
  '$sceDelegateProvider',
  'CONFIG',
  function($sceDelegateProvider, CONFIG) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    CONFIG.apiUrl + '/**'
  ]);
}])

.run(['ApplicationService', function(ApplicationService) {
    // extract all logic out off .run function into service so we can test it
    ApplicationService.run();
  }
]);
