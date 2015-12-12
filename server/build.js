var fs = require('fs-extra');
var glob = require("glob");
var uglifyjs = require("uglify-js");

var pkg = require('../package.json');

// CREATE CONFIG
console.log("[BUILD] [CONF] Creating...");
fs.writeFile(
  "./public/config.js",
  "(function() { window.APP=" + JSON.stringify({
    name: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
    description: pkg.description,
    version: pkg.version,
    repository: pkg.repository,
    author: pkg.author,
  }) + "; })()"
);
console.log("[BUILD] [CONF] Generated at ./public/config.js");

// BUILD ANGULAR
glob("./app/**/*.js", {}, function(er, files) {
  console.log("[BUILD] [ANGU] Building...");
  var result = uglifyjs.minify(files, {
    outSourceMap: "app.min.js.map"
  });
  console.log("[BUILD] [ANGU] Found", files.length, "files");
  fs.writeFile("./public/assets/scripts/app.min.js", result.code);
  fs.writeFile("./public/assets/scripts/app.min.js.map", result.map);
  console.log("[BUILD] [ANGU] Script generated at ./public/assets/scripts/app.min.js");
});

// COPY VIEWS
console.log("[BUILD] [COPY] Views");
console.log("[BUILD] [COPY] Deleting old");
fs.removeSync('./public/views/', function() {
  fs.copySync("./app/", './public/views/', {
    filter: /^.*\.html$/,
  });
  fs.removeSync('./public/views/index.html');
  fs.copySync("./app/index.html", './public/index.html');
  console.log("[BUILD] [COPY] Copied");
});
