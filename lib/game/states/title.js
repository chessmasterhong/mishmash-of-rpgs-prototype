/**
 *  @fileOverview Game logic for the title screen state.
 */

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
        foreground: null,

        init: function() {
            this.parent();

            this.background = this.context.createLinearGradient(0, 0, 0, ig.system.height);
            this.foreground = new ig.Image('media/backgrounds/title.png');
        },

        update: function() {
            this.parent();

            if(ig.input.pressed('LEFT_CLICK')) {
                ig.system.setGame(ig.MainGame);
            }
        },

        draw: function() {
            this.parent();

            this.background.addColorStop(0, 'rgb(9, 20, 158)');
            this.background.addColorStop(1, 'rgb(106, 179, 234)');
            this.context.fillStyle = this.background;
            this.context.fillRect(0, 0, ig.system.width, ig.system.height);

            this.foreground.draw(0, 0);

            this.font.draw('Hello World', ig.system.width / 2, 140, ig.Font.ALIGN.CENTER);
            this.font.draw('Left click to start', ig.system.width / 2, 400, ig.Font.ALIGN.CENTER);
        }
    });
});
