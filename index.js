var express = require('express');
var app = express();

app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/assets', function(req, res, next) {
  res.send(404);
});
app.use('/src', express.static(__dirname + '/public/src'));
app.use('/assets', function(req, res, next) {
  res.send(404);
});

app.get('/api/ua', function(req, res, next) {
  var _ua = req.query.ua || req.headers['user-agent'];
  var ua = require('useragent').parse(_ua);
  res.send(JSON.stringify({
    browser: {
      family: ua.family,
      major: ua.major,
      minor: ua.minor,
      patch: ua.patch,
    },
    device: ua.device,
    os: ua.os,
  }));
});

app.all('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(3001, function() {
  console.log("started...");
});
//
//
// app.get('/api/geo', function(req, res, next) {
//
//   var _ip = req.query.ip || req.ip;
//   var _ua = req.query.ua || req.headers['user-agent'];
//
//   var ua = require('useragent').parse(_ua);
//   var geoip = require('geoip-lite').lookup(_ip);
//
//   var _location = null;
//   if (geoip) {
//     _location = {
//       country: require('i18n-iso-countries').getName(geoip.country, "en"),
//       region: require('fips').longform(geoip.country + geoip.region),
//       city: geoip.city,
//       lon: geoip.ll[0],
//       lat: geoip.ll[1],
//     };
//   }
//
//   res.send(JSON.stringify({
//     browser: {
//       family: ua.family,
//       major: ua.major,
//       minor: ua.minor,
//       patch: ua.patch,
//     },
//     device: ua.device,
//     os: ua.os,
//     ip: _ip,
//     location: _location,
//   }));
//
// });
