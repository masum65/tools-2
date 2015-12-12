/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.quakes')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.quakes',
      config: {
        url: "/quakes",
        templateUrl: 'views/quakes/view.html',
        controller: "QuakesController",
      }
    }];
  }

}());
