ig.module(
    'game.states.title'
)
.requires(
    'game.states.base_game'
)
.defines(function() {
    'use strict';

    ig.Title = ig.BaseGame.extend({
        init: function() {
            this.parent();
        },

        update: function() {
            this.parent();
        },

        draw: function() {
            this.parent();

            this.font.draw('Hello World', 0, 0, ig.Font.ALIGN.LEFT)
        }
    });
});
