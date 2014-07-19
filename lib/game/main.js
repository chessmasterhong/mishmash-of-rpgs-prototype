ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'game.maps.map_0'
)
.defines(function() {
    'use strict';

    ig.MainGame = ig.Game.extend({
        init: function() {
            this.loadLevel(LevelMap_0);
        }
    });

    ig.main('#canvas', ig.MainGame, 60, 640, 480, 1);
});
