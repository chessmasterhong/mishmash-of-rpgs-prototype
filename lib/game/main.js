/**
 *  @fileOverview Core game logics.
 */

ig.module(
    'game.main'
)
.requires(
    'impact.debug.debug',
    'game.states.title',
    'plugins.splash-loader.splash-loader'
)
.defines(function() {
    'use strict';

    ig.global.TILESIZE = 32;

    ig.Entity._debugShowBoxes = true;
    ig.Entity._debugShowVelocities = true;
    ig.Entity._debugShowNames = true;

    ig.main('#canvas', ig.Title, 60, 640, 480, 1, ig.SplashLoader);
});
