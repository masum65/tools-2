/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.static')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.about',
      config: {
        url: "/about",
        templateUrl: 'views/static/pages/about.html',
        controller: function() {
          var vm = this;
          vm.libs = [{
            name: "AngularJS",
            href: "https://angularjs.org/"
          }];
        }
      }
    }, {
      state: 'app.tos',
      config: {
        url: "/tos",
        templateUrl: 'views/static/pages/tos.html',
      }
    }];
  }

}());
