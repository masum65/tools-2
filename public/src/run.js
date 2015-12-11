/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app')
    .run(appRun);

  /* @ngInject */
  function appRun($rootScope, $state, $stateParams) {
    $rootScope.APP = APP;
  }

}());
