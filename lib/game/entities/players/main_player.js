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

            if(ig.input.state('UP')) {
                this.vel.x = 0;
                this.vel.y = -100;
            } else if(ig.input.state('DOWN')) {
                this.vel.x = 0;
                this.vel.y = 100;
            } else if(ig.input.state('LEFT')) {
                this.vel.x = -100;
                this.vel.y = 0;
            } else if(ig.input.state('RIGHT')) {
                this.vel.x = 100;
                this.vel.y = 0;
            } else {
                this.vel.x = 0;
                this.vel.y = 0;
            }
        }
    });
});
