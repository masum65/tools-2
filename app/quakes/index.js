var moment = require('moment');
var request = require('request');
var fs = require('fs');
var express = require('express');
var _ = require('underscore');
var path = require('path');
var router = express.Router();

var _defaults = {
  datespan: "last_24_hours",
  limit: 200,
  mag_min: 3.8,
};

var _datespans = {
  last_24_hours: {
    alias: "last_24_hours",
    label: "Last 24 hours",
    from: moment().subtract(24, 'hours').toISOString(),
    to: moment().toISOString(),
  },
  last_15_days: {
    alias: "last_15_days",
    label: "Last 15 days",
    from: moment().subtract(15, 'days').toISOString(),
    to: moment().toISOString(),
  },
  last_month: {
    alias: "last_month",
    label: "Last month",
    from: moment().subtract(1, 'month').toISOString(),
    to: moment().toISOString(),
  }
};

router.get('/data', function(req, res, next) {
  console.log(req.query);
  request.get({
    url: "http://www.seismicportal.eu/fdsnws/event/1/query",
    qs: {
      starttime: _datespans[req.query.ds || _defaults.datespan].from,
      endtime: _datespans[req.query.ds || _defaults.datespan].to,
      limit: req.query.lm || _defaults.limit,
      format: "json",
      magtype: "ml",
      nodata: 404,
      minmag: req.query.mg || _defaults.mag_min,
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
  res.locals.defaults = _defaults;
  res.locals.datespans = _.map(_datespans, function(ds) {
    ds.selected = (ds.alias == req.query.ds) ? "selected" : "";
    return ds;
  });


  res.render('quakes/view', {
    title: ' - Quakes',
    script: fs.readFileSync(path.join(__dirname, "script.js"), "utf8"),
  });

});

module.exports = router;
