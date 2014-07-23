/* jshint expr: true */
/* global before, describe, expect, it, waitFor */

(function() {
    'use strict';

    describe('Map Stitcher', function() {
        before(function(done) {
            waitFor(function() {
                return ig.game && ig.game.mapStitcher;
            }, function() {
                done();
            });
        });

        describe('Initialization', function() {
            it('should load the module', function() {
                expect(ig.game.mapStitcher).to.be.an.instanceof(ig.global.MapStitcher);
            });
        });
    });
}());
