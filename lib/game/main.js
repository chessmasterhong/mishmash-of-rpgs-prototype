/**
 *  @fileOverview Core game logics.
 */

ig.module(
    'game.main'
)
.requires(
    'game.states.main_game'
)
.defines(function() {
    'use strict';

    ig.main('#canvas', ig.MainGame, 60, 640, 480, 1);
});
