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
            ig.input.bind(ig.KEY.W, 'UP');
            ig.input.bind(ig.KEY.S, 'DOWN');
            ig.input.bind(ig.KEY.A, 'LEFT');
            ig.input.bind(ig.KEY.D, 'RIGHT');

            this.loadLevel(LevelMap_0);

            this.spawnEntity(ig.global.EntityMain_player, 64, 64);
        }
    });

    ig.main('#canvas', ig.MainGame, 60, 640, 480, 1);
});
