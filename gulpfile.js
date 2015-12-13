var fs = require('fs');
var _gulp = require('gulp');
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var minify = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');

var pkg = require('./package.json');

_gulp.task('default', ['sass', 'build', 'config', 'copy'], function() {
  _gulp.watch("./scss/**/**.*", ['sass']);
  _gulp.watch("./app/**/*.js", ['build']);
  _gulp.watch("./app/**/*.html", ['copy']);
  _gulp.watch("./package.json", ['config']);
});

_gulp.task('sass', function() {
  return _gulp.src("./scss/**/**.scss", {
      read: true,
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(_gulp.dest("./public/css/"));
});

_gulp.task('build', ['config'], function() {
  return _gulp.src("./app/**/*.js")
    .pipe(debug({
      title: "build:js"
    }))
    .pipe(angularFilesort())
    .pipe(sourcemaps.init())
    .pipe(concat("app.min.js", {
      newLine: ';'
    }))
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(_gulp.dest("./public/scripts/"));
});

_gulp.task('copy', ['index'], function() {
  return _gulp.src("./app/**/!(index.html)*.html", {
      base: './app'
    })
    .pipe(debug({
      title: "view:html"
    }))
    .pipe(_gulp.dest("./public/views/"));
});

_gulp.task('index', function() {
  return _gulp.src("./app/index.html")
    .pipe(debug({
      title: "view:index"
    }))
    .pipe(_gulp.dest("./public/"));
});

_gulp.task('config', function() {

  fs.writeFileSync(
    "./public/config.js",
    "(function() { window.APP=" + JSON.stringify({
      name: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
      description: pkg.description,
      version: pkg.version,
      repository: pkg.repository,
      author: pkg.author,
      debug: (process.env.NODE_ENV != "production"),
    }) + "; })()"
  );

});
