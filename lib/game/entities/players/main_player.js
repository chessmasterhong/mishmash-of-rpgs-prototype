ig.module(
    'game.entities.players.main_player'
)
.requires(
    'impact.entity'
)
.defines(function() {
    'use strict';

    ig.Entity_MainPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/sprites/players/main_player.png', 32, 32),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
        },

        update: function() {
            this.parent();

            if(ig.input.pressed('UP')) {
                this.vel.y = -100;
            } else if(ig.input.pressed('DOWN')) {
                this.vel.y = 100;
            } else if(ig.input.pressed('LEFT')) {
                this.vel.x = -100;
            } else if(ig.input.pressed('RIGHT')) {
                this.vel.x = 100;
            }
        }
    });
});
