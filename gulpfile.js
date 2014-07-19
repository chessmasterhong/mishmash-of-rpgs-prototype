'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    shell = require('gulp-shell'),
    webserver = require('gulp-webserver');

gulp.task('lint', function() {
    return gulp.src([
            './lib/game/**/*.js',
            './lib/plugins/**/*.js',
            '!./lib/game/{,maps,maps/**/*}'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('doc', function() {
    return gulp.src(['./README.md'])
        .pipe(shell(['./jsdoc -c ./jsdoc.conf.json']));
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: '127.0.0.1',
            port: 8080,
            livereload: true
        }));
});

gulp.task('watch', function() {
    gulp.watch('./lib/**/*.js', ['lint']);
});
