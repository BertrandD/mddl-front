var gulp = require('gulp');
var livereload = require('gulp-livereload');

module.exports = function (config) {
    return [
        config.deps,
        function () {
          livereload.listen();
          return gulp.watch(config.src, Array.isArray(config.tasks) ? config.tasks : [config.tasks])
        }
    ];
};