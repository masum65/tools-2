var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.locals.tool = req.app.locals.TOOLS.clock;

  res.render('clock/view', {
    title: ' - Clock',
    script: fs.readFileSync("./app/clock/script.js", "utf8"),
  });

});

module.exports = router;
