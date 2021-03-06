/**
 *  @fileOverview Game logic for the main game state.
 */

ig.module(
    'game.states.main_game'
)
.requires(
    'game.states.base_game',
    'game.maps.map_0',
    'game.entities.players.main_player'
    //'plugins.map-stitcher.map-stitcher'
)
.defines(function() {
    'use strict';

    ig.MainGame = ig.BaseGame.extend({
        //mapStitcher: null,
        mainPlayer: null,
        speed: 128,

        init: function() {
            this.parent();

            this.loadLevel(ig.global.LevelMap_0);

            //var m = ig.global.LevelMap_0,
            //    r, s = [];
            //for(var y = 0; y < 10; y++) {
            //    r = [];
            //    for(var x = 0; x < 10; x++) { r.push(m); }
            //    s.push(r);
            //}
            //this.mapStitcher = new ig.global.MapStitcher(s, { x: 2, y: 3 });

            this.mainPlayer = this.spawnEntity(ig.global.EntityMain_player, 128, 128);
        },

        update: function() {
            this.parent();

            //this.mapStitcher.update();

            this.screen.x = this.mainPlayer.pos.x - ig.system.width / 2;
            this.screen.y = this.mainPlayer.pos.y - ig.system.height / 2;

            if(ig.input.state('UP')) {
                this.mainPlayer.currentAnim = this.mainPlayer.anims.walkUp;
                //if(ig.input.state('LEFT')) {
                //    this.mainPlayer.vel.x = -this.speed / Math.sqrt(2);
                //    this.mainPlayer.vel.y = -this.speed / Math.sqrt(2);
                //} else if(ig.input.state('RIGHT')) {
                //    this.mainPlayer.vel.x = this.speed / Math.sqrt(2);
                //    this.mainPlayer.vel.y = -this.speed / Math.sqrt(2);
                //} else {
                    this.mainPlayer.vel.x = 0;
                    this.mainPlayer.vel.y = -this.speed;
                //}
            } else if(ig.input.state('DOWN')) {
                this.mainPlayer.currentAnim = this.mainPlayer.anims.walkDown;
                //if(ig.input.state('LEFT')) {
                //    this.mainPlayer.vel.x = -this.speed / Math.sqrt(2);
                //    this.mainPlayer.vel.y = this.speed / Math.sqrt(2);
                //} else if(ig.input.state('RIGHT')) {
                //    this.mainPlayer.vel.x = this.speed / Math.sqrt(2);
                //    this.mainPlayer.vel.y = this.speed / Math.sqrt(2);
                //} else {
                    this.mainPlayer.vel.x = 0;
                    this.mainPlayer.vel.y = this.speed;
                //}
            } else if(ig.input.state('LEFT')) {
                this.mainPlayer.currentAnim = this.mainPlayer.anims.walkLeft;
                this.mainPlayer.vel.x = -this.speed;
                this.mainPlayer.vel.y = 0;
            } else if(ig.input.state('RIGHT')) {
                this.mainPlayer.currentAnim = this.mainPlayer.anims.walkRight;
                this.mainPlayer.vel.x = this.speed;
                this.mainPlayer.vel.y = 0;
            } else {
                this.mainPlayer.vel.x = 0;
                this.mainPlayer.vel.y = 0;

                if(this.mainPlayer.direction === 0) {
                    this.mainPlayer.currentAnim = this.mainPlayer.anims.idleUp;
                } else if(this.mainPlayer.direction === 1) {
                    this.mainPlayer.currentAnim = this.mainPlayer.anims.idleDown;
                } else if(this.mainPlayer.direction === 2) {
                    this.mainPlayer.currentAnim = this.mainPlayer.anims.idleLeft;
                } else if(this.mainPlayer.direction === 3) {
                    this.mainPlayer.currentAnim = this.mainPlayer.anims.idleRight;
                }
            }
        }
    });
});
