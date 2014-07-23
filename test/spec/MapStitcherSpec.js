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

            it('should have the super map data', function() {
                expect(ig.game.mapStitcher.maps).to.exist;
            });

            it('should have a valid initial starting map of the super map', function() {
                expect(ig.game.mapStitcher.currMap).to.exist;
                expect(ig.game.mapStitcher.currMap.x).to.exist;
                expect(ig.game.mapStitcher.currMap.y).to.exist;
                expect(ig.game.mapStitcher.maps[ig.game.mapStitcher.currMap.y][ig.game.mapStitcher.currMap.x]).to.exist;
            });
        });
    });
}());
