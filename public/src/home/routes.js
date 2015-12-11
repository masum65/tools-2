/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.home')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.home',
      config: {
        url: "/",
        templateUrl: 'src/home/view.html',
        controller: "HomeController",
      }
    }];
  }

}());
