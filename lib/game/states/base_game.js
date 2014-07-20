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
        init: function() {
            ig.input.bind(ig.KEY.W, 'UP');
            ig.input.bind(ig.KEY.S, 'DOWN');
            ig.input.bind(ig.KEY.A, 'LEFT');
            ig.input.bind(ig.KEY.D, 'RIGHT');
        }
    });
});
