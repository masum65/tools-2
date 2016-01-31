(function() {
  'use strict';

  angular
    .module('app.clock')
    .controller("ClockController", ClockController);

  /* @ngInject */
  function ClockController($interval) {
    var vm = this;

    vm.hours = "--";
    vm.minutes = "--";
    vm.seconds = "--";
    activate();

    function activate() {
      _tick();
      $interval(_tick, 999);
    }

    function _tick() {
      var _m = moment();
      vm.hours = moment().format("HH");
      vm.minutes = moment().format("mm");
      vm.seconds = moment().format("ss");
    }
  }

}());
