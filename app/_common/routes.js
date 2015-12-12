/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {

    var _states = getStates();
    routerHelper.configureStates(_states, "/");

    configHelper.notifyConfig("Basic Routes", _.map(_states, function(_state) {
      return _state.state;
    }));

  }

  function getStates() {
    return [{
      state: 'app',
      config: {
        abstract: true,
        templateUrl: 'views/_common/views/layout.html',
      }
    }];
  }

}());
