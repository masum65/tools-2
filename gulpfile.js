var fs = require('fs');
var pkg = require('./package.json');
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minify = require('gulp-clean-css');
var minimatch = require('minimatch');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', ['watch']);

gulp.task('watch', ['sass', 'build'], function() {

  gulp.watch("./scss/**/**.*", ['sass']);
  gulp.watch("./public/src/**/*.js", ['build']);

});

gulp.task('sass', function() {

  return gulp.src("./scss/**/**.scss", {
      read: true,
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest("./public/assets/css"));

});

gulp.task('build', ['config'], function() {

  return gulp.src("./public/src/**/*.js")
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
    .pipe(gulp.dest("./public/assets/scripts"));

});

gulp.task('config', function() {

  return fs.writeFile(
    "./public/src/config.js",
    "(function() { window.APP=" + JSON.stringify({
      name: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
      description: pkg.description,
      version: pkg.version,
      repository: pkg.repository,
      author: pkg.author,
    }) + "; })()"
  );

});
