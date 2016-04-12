var gulp = require('gulp');
var eslint = require('gulp-eslint');

module.exports = function (config) {
    return [
        function () {
            return gulp
                .src(config.src)
                .pipe(eslint({ configFile: 'gulp/eslint.json' }))
                .pipe(eslint.format())
                .pipe(eslint.failAfterError())
                ;
        }
    ];
};