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

            this.background = new ig.Image('media/backgrounds/title.png');
        },

        update: function() {
            this.parent();

            if(ig.input.pressed('LEFT_CLICK')) {
                ig.system.setGame(ig.MainGame);
            }
        },

        draw: function() {
            this.parent();

            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');

            var gradient = ctx.createLinearGradient(0, 0, 0, ig.system.height);
            gradient.addColorStop(0, '#091E9E');
            gradient.addColorStop(1, '#6AB3EA');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, ig.system.width, ig.system.height);

            this.background.draw(0, 0);

            this.font.draw('Hello World', ig.system.width / 2, 140, ig.Font.ALIGN.CENTER);
            this.font.draw('Left click to start', ig.system.width / 2, 400, ig.Font.ALIGN.CENTER);
        }
    });
});
