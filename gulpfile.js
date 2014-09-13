/* global require */

'use strict';

var HOST = '127.0.0.1',
    PORT = 8080,
    SOURCE_DIR = './lib/';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
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

gulp.task('test', function() {
    return gulp.src('./TestRunner.html')
        .pipe(shell('mocha-phantomjs -R spec ./TestRunner.html'));
});

gulp.task('docs', function() {
    return gulp.src('./README.md')
        .pipe(shell('jsdoc -c ./jsdoc.conf.json'));
});

gulp.task('clean', function(cb) {
    rimraf('./docs/', cb);
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: HOST,
            port: PORT
        }));
});

gulp.task('watch', function() {
    gulp.watch(SOURCE_DIR + '**/*.js', ['lint']);
});

gulp.task('default', ['webserver', 'watch']);

gulp.task('build', function() {
    runSequence(
        ['clean', 'lint', 'test'],
        'docs'
    );
});
