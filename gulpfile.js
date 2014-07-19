'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    shell = require('gulp-shell');

gulp.task('lint', function() {
    return gulp.src([
            './lib/game/**/*.js',
            './lib/plugins/**/*.js',
            '!./lib/game/{,maps,maps/**/*}'
        ])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('doc', function() {
    return gulp.src(['./README.md'])
        .pipe(shell(['./jsdoc -c ./jsdoc.conf.json']));
});

gulp.task('watch', function() {
    gulp.watch('./index.html');
    gulp.watch('./lib/**/*.js', ['lint']);
});
