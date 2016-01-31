/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.clock')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.clock',
      config: {
        tool: "clock",
        url: "/clock",
        templateUrl: 'views/clock/view.html',
        controller: "ClockController",
      }
    }];
  }

}());
