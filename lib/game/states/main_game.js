/**
 *  @fileOverview Game logic for the main game state.
 */

ig.module(
    'game.states.main_game'
)
.requires(
    'game.states.base_game',
    'game.maps.map_0',
    'game.entities.players.main_player',
    'plugins.map-stitcher.map-stitcher'
)
.defines(function() {
    'use strict';

    ig.MainGame = ig.BaseGame.extend({
        mapStitcher: null,
        mainPlayer: null,

        init: function() {
            this.parent();

            //this.loadLevel(ig.global.LevelMap_0);
            
            this.mapStitcher = new ig.global.MapStitcher([
                [ig.global.LevelMap_0, ig.global.LevelMap_0, ig.global.LevelMap_0],
                [ig.global.LevelMap_0, ig.global.LevelMap_0, ig.global.LevelMap_0],
                [ig.global.LevelMap_0, ig.global.LevelMap_0, ig.global.LevelMap_0],
                [ig.global.LevelMap_0, ig.global.LevelMap_0, ig.global.LevelMap_0]
            ], { x: 2, y: 3 });

            this.mainPlayer = this.spawnEntity(ig.global.EntityMain_player, 64, 64);
        },

        update: function() {
            this.parent();

            this.mapStitcher.update();

            this.screen.x = this.mainPlayer.pos.x - ig.system.width / 2;
            this.screen.y = this.mainPlayer.pos.y - ig.system.height / 2;
        }
    });
});
