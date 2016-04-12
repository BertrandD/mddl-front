const gulp = require('gulp');
const bucket = require('gulp-bucket').default;
const lint = require('./lint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');

module.exports = function (config) {
    return [
        config.lint !== false ? bucket.factory('lint', lint).add(config) : null,
        function () {
            var stream = gulp.src(config.src);

            if (config.es6 != false) {
                stream = stream.pipe(babel({
                    presets: ['es2015']
                }));
            }

            if(!config.noUglify) {
                stream = stream.pipe(uglify());
            }

            if (config.fileName) {
                stream = stream.pipe(concat(config.fileName));
            }

            stream = stream.pipe(gulp.dest(config.dest)).pipe(livereload());

            return stream;
        }
    ];
};