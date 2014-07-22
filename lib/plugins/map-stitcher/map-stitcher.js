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
        currMap: { x: 0, y: 0 },

        init: function(maps, startMap) {
            this.maps = maps;

            this.currMap.x = startMap.x;
            this.currMap.y = startMap.y;

            var x, y, z,
                map, layer,
                layerNames = [];

            // Concatenate every unique layer name of every map into the super layers of the super map
            for(y = 0; y < this.maps.length; y++) {
                for(x = 0; x < this.maps[y].length; x++) {
                    map = this.maps[y][x];
                    for(z = 0; z < map.layer.length; z++) {
                        layer = map.layer[z];
                        if(layerNames.indexOf(layer.name) === -1) {
                            console.log('"' + layer.name + '" layer from map (' + x + ', ' + y + ') not found in layerNames. Adding to layerNames.')
                            layerNames.push(layer.name);
                        } else {
                            console.log('"' + layer.name + '" layer from map (' + x + ', ' + y + ') exists in layerNames. Skipping.')
                        }
                    }
                }
            }

            console.log(layerNames);

            ig.game.loadLevel(this.maps[this.currMap.x][this.currMap.y]);
        }
    });
});
