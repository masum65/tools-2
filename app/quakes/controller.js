(function() {
  'use strict';

  angular
    .module('app.quakes')
    .controller("QuakesController", QuakesController);

  /* @ngInject */
  function QuakesController($http) {
    var vm = this;

    activate();

    function activate() {

      vm.leaflet = {
        center: {
          lat: 0,
          lng: 0,
          zoom: 6
        },
        paths: {},
        markers: {},
        // layers: {
        //   baselayers: {
        //     xyz: {
        //       name: 'OpenStreetMap (XYZ)',
        //       url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        //       type: 'xyz'
        //     }
        //   },
        //   overlays: {
        //     realworld: {
        //       name: "Real world data",
        //       type: "markercluster",
        //       visible: true
        //     }
        //   }
        // }
      };

      _detectLocation()
        .then(function(location) {
          vm.location = location;
          vm.leaflet.center.lat = vm.location.latitude;
          vm.leaflet.center.lng = vm.location.longitude;

          _getQuakes()
            .then(function(quakes) {
              vm.quakes = quakes;
              vm.leaflet.markers = _.map(quakes.features, function(feature) {
                return {
                  // group: 'quakes',
                  message: feature.properties.flynn_region + " " + feature.properties.time + "<hr style='margin:2px'/> Magnitude: " +
                    feature.properties.mag + " " + feature.properties.magtype + " - Depth: " + feature.properties.depth,
                  lat: feature.properties.lat,
                  lng: feature.properties.lon,
                  opacity: 0.8
                };
              });
              var _c = ['#008000', '#547c00', '#807500', '#a46a00', '#c05e00', '#df4600', '#ff0000'];

              vm.leaflet.paths = _.map(quakes.features, function(feature) {
                return {
                  type: "circle",
                  color: _c[Math.round((feature.properties.mag - 3.5) * 2)],
                  stroke: false,
                  clickable: false,
                  fillOpacity: 0.5,
                  radius: Math.pow(10, feature.properties.mag),
                  latlngs: {
                    lat: feature.properties.lat,
                    lng: feature.properties.lon
                  }
                };
              });

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

    function _getQuakes() {
      return $http
        .jsonp("//www.seismicportal.eu/fdsnws/event/1/query", {
          params: {
            starttime: moment().subtract(7, "days").toISOString(),
            limit: 200,
            // lat: vm.location.latitude, //DEFAULT ATHENS
            // lon: vm.location.longitude, //DEFAULT ATHENS
            // minradius: 0,
            // maxradius: 8,
            format: "jsonp",
            magtype: "ml",
            nodata: 404,
            minmag: 3.5,
            callback: "JSON_CALLBACK"
          }
        })
        .then(function(response) {
          return response.data;
        });
    }


  }

}());
