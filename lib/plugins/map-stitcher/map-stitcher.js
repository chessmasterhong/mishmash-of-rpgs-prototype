/**
 *  @fileOverview A map stitching plugin for ImpactJS. Connects multiple maps
 *    together in a configurable order to create a "super map". Allows seamless
 *    transitions while moving between sections of the "super map".
 *  @author Kevin Chan {@link https://github.com/chessmasterhong|(chessmasterhong)}
 */

ig.module(
    'plugins.map-stitcher.map-stitcher'
)
.requires(
    'impact.game',
    'impact.system'
)
.defines(function() {
    'use strict';

    ig.global.MapStitcher = ig.Class.extend({
        maps: null,

        init: function(maps) {
            ig.game.loadLevel(maps[0][0]);
        }
    });
});
