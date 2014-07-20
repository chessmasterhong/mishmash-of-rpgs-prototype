ig.module(
    'game.entities.players.main_player'
)
.requires(
    'game.entities.abstractities.base_player'
)
.defines(function() {
    'use strict';

    ig.global.EntityMain_player = ig.global.EntityBase_player.extend({
        animSheet: new ig.AnimationSheet('media/sprites/players/main_player.png', 32, 32),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
        }
    });
});
