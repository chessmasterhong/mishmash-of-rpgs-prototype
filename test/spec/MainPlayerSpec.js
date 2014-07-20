/* jshint expr: true */
/* global beforeEach, describe, expect, it, waitFor */

(function() {
    'use strict';

    var mainPlayerIndex = null;

    describe('Main Player', function() {
        beforeEach(function(done) {
            waitFor(function() {
                return ig.game;
            }, function() {
                done();
            });
        });

        describe('Initialization', function() {
            it('should exist in the game world', function() {
                expect(ig.game.entities).to.not.be.empty;

                for(var i = 0; i < ig.game.entities.length; i++) {
                    if(ig.game.entities[i] instanceof ig.global.EntityMain_player) {
                        mainPlayerIndex = i;
                    }
                }

                expect(mainPlayerIndex).to.be.at.least(0);
            });
        });

        describe('Directional movement', function() {
            it('should not move when no directional keys are pressed', function() {
                expect(ig.input.actions).to.be.empty;
                expect(ig.game.entities[mainPlayerIndex].vel.x).to.equal(0);
                expect(ig.game.entities[mainPlayerIndex].vel.y).to.equal(0);
            });

            it('should move up when the up directional key is pressed', function() {
                ig.input.actions = { UP: true };
                setTimeout(function() {
                    expect(ig.game.entities[mainPlayerIndex].vel.x).to.equal(0);
                    expect(ig.game.entities[mainPlayerIndex].vel.y).to.be.below(0);
                    ig.input.actions = {};
                }, 100);
            });

            it('should move down when the down directional key is pressed', function() {
                ig.input.actions = { DOWN: true };
                setTimeout(function() {
                    expect(ig.game.entities[mainPlayerIndex].vel.x).to.equal(0);
                    expect(ig.game.entities[mainPlayerIndex].vel.y).to.be.above(0);
                    ig.input.actions = {};
                }, 100);
            });

            it('should move left when the left directional key is pressed', function() {
                ig.input.actions = { LEFT: true };
                setTimeout(function() {
                    expect(ig.game.entities[mainPlayerIndex].vel.x).to.be.below(0);
                    expect(ig.game.entities[mainPlayerIndex].vel.y).to.equal(0);
                    ig.input.actions = {};
                }, 100);
            });

            it('should move right when the right directional key is pressed', function() {
                ig.input.actions = { RIGHT: true };
                setTimeout(function() {
                    expect(ig.game.entities[mainPlayerIndex].vel.x).to.be.above(0);
                    expect(ig.game.entities[mainPlayerIndex].vel.y).to.equal(0);
                    ig.input.actions = {};
                }, 100);
            });
        });

        describe('Grid alignment', function() {
            it('should be aligned to the game grid when not moving', function() {
                waitFor(function() {
                    return ig.game.entities[mainPlayerIndex].vel.x === 0 && ig.game.entities[mainPlayerIndex].vel.y === 0;
                }, function() {
                    expect(ig.game.entities[mainPlayerIndex].pos.x % 32).to.equal(0);
                    expect(ig.game.entities[mainPlayerIndex].pos.y % 32).to.equal(0);
                });
            });
        });
    });
}());
