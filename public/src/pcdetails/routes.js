/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.pcdetails')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.pcdetails',
      config: {
        url: "/pcdetails",
        templateUrl: 'src/pcdetails/view.html',
        controller: "PCDetailsController",
      }
    }];
  }

}());
