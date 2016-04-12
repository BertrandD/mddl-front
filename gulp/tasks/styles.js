var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');

module.exports = function (config) {
  return [
    function () {
      var stream = gulp.src(config.src)
      .pipe(plumber({
        errorHandler: function (err) {
          console.error(err);
          this.emit('end');
        }
      }));

      if (config.sass) {
        stream = stream.pipe(sass())
      } else {
        stream = stream.pipe(less())
      }
      stream = stream.pipe(autoprefixer('last 3 versions')).pipe(minifyCSS());

      if (config.fileName) {
        stream = stream.pipe(concat(config.fileName));
      }

      return stream.pipe(gulp.dest(config.dest)).pipe(livereload());
    }
  ];
};