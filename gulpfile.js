var _ = require('lodash');
var gulp = require('gulp');
var bucket = require('gulp-bucket').default;

var config = require('./gulp/config');
var styles = require('./gulp/tasks/styles');
var scripts = require('./gulp/tasks/scripts');
var watch = require('./gulp/tasks/watch');
var sequence = require('./gulp/tasks/sequence');
var templates = require('./gulp/tasks/templates');
var fonts = require('./gulp/tasks/fonts');
var i18n = require('./gulp/tasks/i18n');

bucket
    .use(gulp)
;

bucket
    .factory('styles', styles)
    .add(config.styles)
;

bucket
    .factory('scripts', scripts)
    .add(config.js)
;

bucket
    .factory('templates', templates)
    .add(config.templates)
;

bucket
    .factory('fonts', fonts)
    .add(config.fonts)
;


bucket
    .factory('i18n', i18n)
    .add()
;

bucket
    .factory('watch', watch)
    .add([
        _.map(config.styles, function (conf) { return { alias: 'styles/' + conf.alias, src: conf.src, deps: bucket.name('styles', conf.alias), tasks: bucket.name('styles', conf.alias) }; }),
        _.map(config.js, function (conf) { return { alias: 'scripts/' + conf.alias, src: conf.src, deps: bucket.name('scripts', conf.alias), tasks: bucket.name('scripts', conf.alias) }; }),
        _.map(config.templates, function (conf) { return { alias: 'templates/' + conf.alias, src: conf.src, deps: bucket.name('templates', conf.alias), tasks: bucket.name('templates', conf.alias) }; }),
        { alias: 'i18n', src: 'assets/i18n/**/*.json', tasks: ['i18n'] }
    ])
;

bucket.main(
    bucket
        .factory('sequence', sequence)
        .add({ alias: 'build', sequence: ['fonts', 'templates', 'styles', 'scripts', 'i18n'] })
)
;