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
<<<<<<< HEAD
        $rootScope.title = (toState.title) ? toState.title : APP.description;
      } else {
        $rootScope.title = null;
=======
        $rootScope.pageTitle = (toState.title) ? ' - ' + toState.data.pageTitle : '';
>>>>>>> parent of a6a272d... merge
      }

      if (toState.tool) {
        $rootScope.tool = _.findWhere(TOOLS, {
          alias: toState.tool
        });
<<<<<<< HEAD
        $rootScope.title = ' - ' + $rootScope.tool.title + " v" + $rootScope.tool.version;
      } else {
        $rootScope.tool = null;
=======
        $rootScope.pageTitle = ' - ' + $rootScope.tool.title + " v" + $rootScope.tool.version;
>>>>>>> parent of a6a272d... merge
      }
    });

  }

}());
