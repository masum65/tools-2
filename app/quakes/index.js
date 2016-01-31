var moment = require('moment');
var request = require('request');
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/data', function(req, res, next) {

  var _ds_from = moment().subtract(24, 'hours').toISOString();
  var _ds_to = moment().toISOString();
  var _limit = 200;
  var _mag_min = 3.8;

  request.get({
    url: "http://www.seismicportal.eu/fdsnws/event/1/query",
    formData: {
      starttime: req.query.ds_from || _ds_from,
      endtime: req.query.ds_to || _ds_to,
      limit: req.query.limit || _limit,
      // lat: req.query.latitude, //DEFAULT ATHENS
      // lon: req.query.longitude, //DEFAULT ATHENS
      // minradius: 0,
      // maxradius: 8,
      format: "json",
      magtype: "ml",
      nodata: 404,
      minmag: req.query.mag_min || _mag_min,
      callback: "JSON_CALLBACK"
    },
  }, function(err, response, data) {
    if (err) throw err;
    res.send(data);
  });

});

router.get('/', function(req, res, next) {

  var _ua = req.query.ua || req.headers['user-agent'];
  var ua = require('useragent').parse(_ua);

  res.locals.tool = req.app.locals.TOOLS.quakes;

  res.locals.datespan = [{
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

  res.locals.filters = {
    limit: 200,
    ds: res.locals.datespan[0],
    mag_min: 3.8,
  };

  res.locals.leaflet = {
    center: {
      lat: 0,
      lng: 0,
      zoom: 6
    },
    paths: {},
    markers: {},
  };


  res.render('quakes/view', {
    title: ' - Quakes',
    script: fs.readFileSync("./app/quakes/script.js", "utf8"),
  });

});

module.exports = router;
