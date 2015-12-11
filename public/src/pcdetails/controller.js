(function() {
  'use strict';

  angular
    .module('app.pcdetails')
    .controller("PCDetailsController", PCDetailsController);

  /* @ngInject */
  function PCDetailsController($http) {
    var vm = this;

    activate();

    function activate() {
      vm.leaflet = {
        center: {
          lat: 0,
          lng: 0,
          zoom: 14
        },
        markers: {}
      };

      _detectSystem()
        .then(function(data) {
          vm.system = data;
        });

      _detectLocation()
        .then(function(data) {
          vm.location = data;
          vm.leaflet.markers.mylocation = {
            draggable: false,
            lat: vm.location.latitude,
            lng: vm.location.longitude
          };
          vm.leaflet.center.lat = vm.location.latitude;
          vm.leaflet.center.lng = vm.location.longitude;
        });

    }

    function _detectSystem() {
      return $http
        .get("/api/ua")
        .then(function(response) {
          return angular.extend(response.data, {
            cookies: navigator.cookieEnabled,
            flash: swfobject.getFlashPlayerVersion(),
            screenWidth: screen.width,
            screenHeight: screen.height,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        });
    }

    function _detectLocation() {
      return $http
        .get("//freegeoip.net/json/")
        .then(function(response) {
          return response.data;
        });
    }

  }

}());
