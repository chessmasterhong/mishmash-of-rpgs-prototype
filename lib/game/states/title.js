ig.module(
    'game.states.title'
)
.requires(
    'game.states.base_game',
    'game.states.main_game'
)
.defines(function() {
    'use strict';

    ig.Title = ig.BaseGame.extend({
        init: function() {
            this.parent();
            console.log(ig.game.screen.x)
        },

        update: function() {
            this.parent();

            if(ig.input.pressed('LEFT_CLICK')) {
                ig.system.setGame(ig.MainGame);
            }
        },

        draw: function() {
            this.parent();

            this.font.draw('Hello World', ig.system.width / 2, 140, ig.Font.ALIGN.CENTER);
            this.font.draw('Left click to start', ig.system.width / 2, 400, ig.Font.ALIGN.CENTER);
        }
    });
});
