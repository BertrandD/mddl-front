var gulp = require('gulp');

module.exports = function (config) {
    return [
        function () {
            return gulp
                .src(config.src)
                .pipe(gulp.dest(config.dest))
                ;
        }
    ];
};