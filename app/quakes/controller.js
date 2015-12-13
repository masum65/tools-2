(function() {
  'use strict';

  angular
    .module('app.quakes')
    .controller("QuakesController", QuakesController);

  /* @ngInject */
  function QuakesController($http) {

    var _location = null;

    var vm = this;

    vm.datespan = [{
      label: "Last 24 hours",
      from: moment().subtract(24, 'hours').toISOString(),
      to: moment().toISOString(),
    }, {
      label: "Last 15 days",
      from: moment().subtract(15, 'days').toISOString(),
      to: moment().toISOString(),
    }, {
      label: "Last month",
      from: moment().subtract(1, 'month').toISOString(),
      to: moment().toISOString(),
    }];

    vm.filters = {
      limit: 200,
      ds: vm.datespan[0],
      mag_min: 3.8,
    };
    vm.leaflet = {
      center: {
        lat: 0,
        lng: 0,
        zoom: 6
      },
      paths: {},
      markers: {},
    };
    vm.quakes = null;

    vm.refresh = refresh;

    activate();

    function activate() {
      _setTool();
      _setLocation()
        .then(function() {
          vm.leaflet.center.lat = _location.latitude;
          vm.leaflet.center.lng = _location.longitude;
        });

      vm.refresh();

    }

    function refresh() {
      vm.loading = true;
      _getQuakes()
        .then(function(quakes) {
          vm.quakes = quakes;
          _buildQuakes();
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function _setLocation() {
      return $http
        .get("//freegeoip.net/json/")
        .then(function(response) {
          _location = response.data;
        });
    }

    function _getQuakes() {
      return $http
        .jsonp("//www.seismicportal.eu/fdsnws/event/1/query", {
          params: {
            starttime: vm.filters.ds.from,
            endtime: vm.filters.ds.to,
            limit: vm.filters.limit,
            // lat: vm.location.latitude, //DEFAULT ATHENS
            // lon: vm.location.longitude, //DEFAULT ATHENS
            // minradius: 0,
            // maxradius: 8,
            format: "jsonp",
            magtype: "ml",
            nodata: 404,
            minmag: vm.filters.mag_min,
            callback: "JSON_CALLBACK"
          }
        })
        .then(function(response) {
          return response.data;
        });
    }

    function _buildQuakes() {
      vm.leaflet.markers = _.map(vm.quakes.features, function(feature) {
        return {
          // group: 'vm.quakes',
          message: feature.properties.flynn_region + " " + feature.properties.time + "<hr style='margin:2px'/> Magnitude: " +
            feature.properties.mag + " " + feature.properties.magtype + " - Depth: " + feature.properties.depth,
          lat: feature.properties.lat,
          lng: feature.properties.lon,
          opacity: 0.8
        };
      });
      var _c = ['#008000', '#547c00', '#807500', '#a46a00', '#c05e00', '#df4600', '#ff0000'];

      vm.leaflet.paths = _.map(vm.quakes.features, function(feature) {
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
    }

    function _setTool() {
      console.log(vm)
    }
  }

}());
