var _ = require('lodash');
var gulp = require('gulp');
var jsoncombine = require('gulp-jsoncombine');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');

var fs = require('fs');
var path = require('path');
var base = 'assets/i18n/';
var locales = fs.readdirSync(path.join(__dirname, '../../assets/i18n'));

module.exports = function () {
    return [
        function () {
            _.forEach(locales, function (locale) {
                function mergeBuffer (data) {
                    var output = {};

                    _.forEach(data, function (value, scope) {
                        _.assign(output, data[scope]);
                    });

                    function toString (key, value) {
                        if (_.isObject(value)) {
                            return value;
                        }

                        return String(value);
                    }

                    return new Buffer('angular.module(\'app\').constant(\'LOCALE_' + locale.toUpperCase() + '\', ' + JSON.stringify(output, toString) + ');');
                }

                gulp
                    .src(base + locale + '/*.json')
                    .pipe(plumber())
                    .pipe(jsoncombine(locale + '.js', mergeBuffer))
                    .pipe(gulp.dest('dist/js/i18n/'))
                    .pipe(livereload());
                ;
            });
        }
    ];
};