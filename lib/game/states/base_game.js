/**
 *  @fileOverview Basic game state with common state logics. This is an abstract
 *    game state that should be extended.
 */

ig.module(
    'game.states.base_game'
)
.requires(
    'impact.game'
)
.defines(function() {
    'use strict';

    ig.BaseGame = ig.Game.extend({
        font: null,

        canvas: null,
        ctx: null,

        init: function() {
            this.font = new ig.Font('media/interface/fonts/04b03.font.png');

            ig.input.bind(ig.KEY.W, 'UP');
            ig.input.bind(ig.KEY.S, 'DOWN');
            ig.input.bind(ig.KEY.A, 'LEFT');
            ig.input.bind(ig.KEY.D, 'RIGHT');

            ig.input.bind(ig.KEY.MOUSE1, 'LEFT_CLICK');

            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');
        }
    });
});
