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

            this.background = this.ctx.createLinearGradient(0, 0, 0, ig.system.height);
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

            this.background.addColorStop(0, '#091E9E');
            this.background.addColorStop(1, '#6AB3EA');

            this.ctx.fillStyle = this.background;
            this.ctx.fillRect(0, 0, ig.system.width, ig.system.height);

            this.foreground.draw(0, 0);

            this.font.draw('Hello World', ig.system.width / 2, 140, ig.Font.ALIGN.CENTER);
            this.font.draw('Left click to start', ig.system.width / 2, 400, ig.Font.ALIGN.CENTER);
        }
    });
});
