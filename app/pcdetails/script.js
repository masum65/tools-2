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

    $("#map-wrapper").addClass("loading");
    $.getJSON('location', function(data) {

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

      $("#map-wrapper").removeClass("loading");
    });

  });
