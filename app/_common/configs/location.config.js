/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .config(LocationConfig);

  /* @ngInject */
  function LocationConfig(configHelperProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
  }

}());
