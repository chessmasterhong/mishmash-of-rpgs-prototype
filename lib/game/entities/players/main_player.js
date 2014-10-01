ig.module(
    'game.entities.players.main_player'
)
.requires(
    'game.entities.abstractities.base_player'
)
.defines(function() {
    'use strict';

    ig.global.EntityMain_player = ig.global.EntityBase_player.extend({
        size: { x: 64, y: 64 },

        direction: 1,

        animSheet: new ig.AnimationSheet('media/sprites/players/8bAwU486.png', 64, 64),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('idleUp', 1, [192]);
            this.addAnim('walkUp', 0.1, [193, 194, 195, 196, 197, 198, 199, 200]);

            this.addAnim('idleDown', 1, [240]);
            this.addAnim('walkDown', 0.1, [241, 242, 243, 244, 245, 246, 247, 248]);

            this.addAnim('idleLeft', 1, [216]);
            this.addAnim('walkLeft', 0.1, [217, 218, 219, 220, 221, 222, 223, 224]);

            this.addAnim('idleRight', 1, [264]);
            this.addAnim('walkRight', 0.1, [265, 266, 267, 268, 269, 270, 271, 272]);
        },

        update: function() {
            this.parent();

            if(this.vel.y < 0) {
                this.direction = 0;
            } else if(this.vel.y > 0) {
                this.direction = 1;
            } else if(this.vel.x < 0) {
                this.direction = 2;
            } else if(this.vel.x > 0) {
                this.direction = 3;
            }
        }
    });
});
