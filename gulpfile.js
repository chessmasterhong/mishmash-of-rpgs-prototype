/* global require */

'use strict';

var PORT = 8080,
    SOURCE_DIR = './lib/';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rimraf = require('rimraf'),
    shell = require('gulp-shell'),
    webserver = require('gulp-webserver');

gulp.task('lint', function() {
    return gulp.src([
            SOURCE_DIR + 'game/**/*.js',
            SOURCE_DIR + 'plugins/**/*.js',
            '!' + SOURCE_DIR + 'game/{,maps,maps/**/*}'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('doc', function() {
    return gulp.src(['./README.md'])
        .pipe(shell(['jsdoc -c ./jsdoc.conf.json']));
});

gulp.task('clean', function(cb) {
    rimraf('./docs/', cb);
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: '127.0.0.1',
            port: PORT,
            livereload: true
        }));
});

gulp.task('watch', function() {
    gulp.watch(SOURCE_DIR + '**/*.js', ['lint']);
});

gulp.task('default', ['webserver', 'watch']);

gulp.task('build', ['clean'], function() {
    gulp.start('lint', 'doc');
});
