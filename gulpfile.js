'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('lint', function() {
    return gulp.src([
            './lib/game/**/*.js',
            './lib/plugins/**/*.js',
            '!./lib/game/{,maps,maps/**/*}'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(require('jshint-stylish')));
});
