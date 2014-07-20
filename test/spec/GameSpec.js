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
});
