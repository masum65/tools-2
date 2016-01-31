  $(function() {

    var map = L.map('map').setView([0, 0], 1);
    var mg_colors = ['#008000', '#547c00', '#807500', '#a46a00', '#c05e00', '#df4600', '#ff0000'];
    var dataLayer = null;

    function _loadQuakes() {

      _getQuakes(function(quakes) {

        if (dataLayer) map.removeLayer(dataLayer);
        dataLayer = new L.FeatureGroup();
        _.each(quakes.features, function(feature) {
          L.marker(
              [feature.properties.lat, feature.properties.lon], {
                opacity: 0.8,
              })
            .bindPopup(feature.properties.flynn_region + " " + feature.properties.time + "<hr style='margin:2px'/> Magnitude: " +
              feature.properties.mag + " " + feature.properties.magtype + " - Depth: " + feature.properties.depth)
            .addTo(dataLayer);

          L.circle(
            [feature.properties.lat, feature.properties.lon],
            10000 + Math.pow(10, feature.properties.mag), {
              color: mg_colors[Math.round((feature.properties.mag - 3.5) * 2)],
              stroke: false,
              clickable: false,
              fillOpacity: 0.5,
            }).addTo(dataLayer);

        });
        map.addLayer(dataLayer);

      });

    }

    function _getQuakes(cb) {
      $.getJSON('quakes/data', {
        ds: $("#ds").val(),
        lm: $("#lm").val(),
        mg: $("#mg").val(),
      }, function(data) {
        cb(data);
      });
    }

    function _loadMap() {
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    }

    _loadMap();
    _loadQuakes();

    $("#refresh").on("click", function() {
      _loadQuakes();
    });

  });
