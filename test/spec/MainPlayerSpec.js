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

            var mainPlayerInstance = false;
            for(var i = 0; i < ig.game.entities.length; i++) {
                if(ig.game.entities[i] instanceof ig.global.EntityMain_player) {
                    mainPlayerInstance = true;
                }
            }

            expect(mainPlayerInstance).to.be.true;
        });
    });

    describe('Directional movement', function() {
        it('should not move when no directional keys are pressed', function() {
            expect(ig.input.actions).to.be.empty;
            expect(ig.game.entities[0].vel.x).to.equal(0);
            expect(ig.game.entities[0].vel.y).to.equal(0);
        });

        it('should move up when the up directional key is pressed', function() {
            ig.input.actions = { UP: true };
            setTimeout(function() {
                expect(ig.game.entities[0].vel.x).to.equal(0);
                expect(ig.game.entities[0].vel.y).to.be.below(0);
                ig.input.actions = {};
            }, 100);
        });

        it('should move down when the down directional key is pressed', function() {
            ig.input.actions = { DOWN: true };
            setTimeout(function() {
                expect(ig.game.entities[0].vel.x).to.equal(0);
                expect(ig.game.entities[0].vel.y).to.be.above(0);
                ig.input.actions = {};
            }, 100);
        });

        it('should move left when the left directional key is pressed', function() {
            ig.input.actions = { LEFT: true };
            setTimeout(function() {
                expect(ig.game.entities[0].vel.x).to.be.below(0);
                expect(ig.game.entities[0].vel.y).to.equal(0);
                ig.input.actions = {};
            }, 100);
        });

        it('should move right when the right directional key is pressed', function() {
            ig.input.actions = { RIGHT: true };
            setTimeout(function() {
                expect(ig.game.entities[0].vel.x).to.be.above(0);
                expect(ig.game.entities[0].vel.y).to.equal(0);
                ig.input.actions = {};
            }, 100);
        });
    });

    describe('Grid alignment', function() {
        it('should be aligned to the game grid when not moving', function() {
            waitFor(function() {
                return ig.game.entities[0].vel.x === 0 && ig.game.entities[0].vel.y === 0;
            }, function() {
                expect(ig.game.entities[0].pos.x % 32).to.equal(0);
                expect(ig.game.entities[0].pos.y % 32).to.equal(0);
            });
        })
    });
});
