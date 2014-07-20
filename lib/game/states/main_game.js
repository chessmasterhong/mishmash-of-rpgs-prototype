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
)
.defines(function() {
    'use strict';

    ig.MainGame = ig.BaseGame.extend({
        init: function() {
            this.parent();

            this.loadLevel(ig.global.LevelMap_0);

            this.TILESIZE = ig.game.collisionMap.tilesize;

            this.spawnEntity(ig.global.EntityMain_player, 64, 64);
        }
    });
});
