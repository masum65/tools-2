  $(function() {

    $("#screenWidth").text(screen.width);
    $("#screenHeight").text(screen.height);

    $("#innerWidth").text(window.innerWidth);
    $("#innerHeight").text(window.innerHeight);

    if (navigator.cookieEnabled) {
      $("#hasCookies").show();
    } else {
      $("#hasNotCookies").show();
    }

    var flash = swfobject.getFlashPlayerVersion();
    if (flash) {
      $("#hasFlash").show();
      $("#flashMajor").text(flash.major);
      $("#flashMinor").text(flash.minor);
      $("#flashRelease").text(flash.release);
    } else {
      $("#hasNotFlash").show();
    }

    $.getJSON('pcdetails/location', function(data) {

      $("#location_ip").text(data.ip);
      $("#location_city").text(data.city);
      $("#location_region_name").text(data.region_name);
      $("#location_country_name").text(data.country_name);
      $("#location_latitude").text(data.latitude);
      $("#location_longitude").text(data.longitude);
      $("#location_time_zone").text(data.time_zone);

      var map = L.map('map').setView([data.latitude, data.longitude], 11);

      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      L.marker([data.latitude, data.longitude]).addTo(map);

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
      
    });

  });
