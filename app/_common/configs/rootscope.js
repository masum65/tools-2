/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app')
    .run(appRun);

  /* @ngInject */
  function appRun($rootScope, $state, $stateParams, TOOLS) {
    $rootScope.APP = APP;

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.title) {
        $rootScope.pageTitle = (toState.title) ? ' - ' + toState.data.pageTitle : '';
      }

      if (toState.tool) {
        $rootScope.tool = _.findWhere(TOOLS, {
          alias: toState.tool
        });
        $rootScope.pageTitle = ' - ' + $rootScope.tool.title + " v" + $rootScope.tool.version;
      }
    });

  }

}());
