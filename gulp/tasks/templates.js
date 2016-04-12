var gulp = require('gulp');
var bucket = require('gulp-bucket').default;
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var templateCache = require('gulp-angular-templatecache');


module.exports = function (config) {
    return [
        function () {
            var stream = gulp.src(config.src)
                .pipe(templateCache({ module: 'app' }))
                ;

            if (config.fileName) {
                stream = stream.pipe(concat(config.fileName));
            }

            stream = stream.pipe(gulp.dest(config.dest)).pipe(livereload());

            return stream;
        }
    ];
};