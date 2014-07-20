/* jshint expr: true */
/* global beforeEach, describe, expect, it, waitFor */

(function() {
    'use strict';

    describe('Game', function() {
        beforeEach(function(done) {
            waitFor(function() {
                return ig.game;
            }, function() {
                done();
            });
        });

        describe('Initialization', function() {
            it('should load the game object', function() {
                expect(ig.ready).to.be.true;
            });

            it('should have width of 640 pixels', function() {
                expect(ig.system.width).to.equal(640);
            });

            it('should have height of 480 pixels', function() {
                expect(ig.system.height).to.equal(480);
            });

            it('should have scale factor of 1', function() {
                expect(ig.system.scale).to.equal(1);
            });
        });

        describe('Input controls', function() {
            it('should have directional keybindings assigned', function() {
                expect(ig.input.bindings).to.not.be.empty;

                var assignedKeys = {};
                for(var key in ig.input.bindings) {
                    if(ig.input.bindings.hasOwnProperty(key)) {
                        if(ig.input.bindings[key] === 'UP') {
                            assignedKeys.up = key;
                        } else if(ig.input.bindings[key] === 'DOWN') {
                            assignedKeys.down = key;
                        } else if(ig.input.bindings[key] === 'LEFT') {
                            assignedKeys.left = key;
                        } else if(ig.input.bindings[key] === 'RIGHT') {
                            assignedKeys.right = key;
                        }
                    }
                }

                expect(assignedKeys.up).to.exist;
                expect(assignedKeys.down).to.exist;
                expect(assignedKeys.left).to.exist;
                expect(assignedKeys.right).to.exist;
            });
        });
    });
}());
