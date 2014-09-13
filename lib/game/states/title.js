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
        background: null,

        init: function() {
            this.parent();

            this.background = new ig.Image('media/backgrounds/title.jpg');
        },

        update: function() {
            this.parent();

            if(ig.input.pressed('LEFT_CLICK')) {
                ig.system.setGame(ig.MainGame);
            }
        },

        draw: function() {
            this.parent();

            this.background.draw(0, 0);

            this.font.draw('Hello World', ig.system.width / 2, 140, ig.Font.ALIGN.CENTER);
            this.font.draw('Left click to start', ig.system.width / 2, 400, ig.Font.ALIGN.CENTER);
        }
    });
});
