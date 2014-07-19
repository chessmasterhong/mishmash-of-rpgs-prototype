ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'game.maps.map_0',
    'game.entities.players.main_player'
)
.defines(function() {
    'use strict';

    ig.MainGame = ig.Game.extend({
        init: function() {
            this.loadLevel(LevelMap_0);

            this.spawnEntity(ig.Entity_MainPlayer, 64, 64);
        }
    });

    ig.main('#canvas', ig.MainGame, 60, 640, 480, 1);
});
