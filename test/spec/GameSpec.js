describe('Game', function() {
    beforeEach(function() {
        ig.main('#canvas', ig.MainGame, 60, 640, 480, 1);
    });

    it('should load the game object', function() {
        expect(ig.ready).to.be.true;
    });

    it('should create a canvas with width 640 pixels', function() {
        expect(ig.system.width).to.equal(640);
    });

    it('should create a canvas with height 480 pixels', function() {
        expect(ig.system.height).to.equal(480);
    });

    it('should create a canvas with scale factor of 1', function() {
        expect(ig.system.scale).to.equal(1);
    });
});
