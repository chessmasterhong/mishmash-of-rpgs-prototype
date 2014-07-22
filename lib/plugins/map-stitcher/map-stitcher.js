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

            ig.game.loadLevel(this.maps[this.currMap.x][this.currMap.y]);

            var x, y, z,
                map, layer,
                layerNames = [];

            // Concatenate all unique layer names of every map into the layers of the super map
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

            var i, j,
                layerData, currMapData, backgroundMap, row;

            for(i = 0; i < layerNames.length; i++) {
                layerData = null;
                for(j = 0; j < ig.game.backgroundMaps.length; j++) {
                    if(layerNames[i] === ig.game.backgroundMaps[j].name) {
                        layerData = ig.game.backgroundMaps[j];
                        break;
                    } else if(layerNames[i] === 'collision') {
                        layerData = ig.game.collisionMap;
                        break;
                    }
                }

                // Current map does not have this layer
                // Create new layer for current map in place of missing layer and fill layer data with initial values
                if(layerData === null) {
                    currMapData = [];
                    for(y = 0; y < ig.game.backgroundMaps[0].height; y++) {
                        row = [];
                        for(x = 0; x < ig.game.backgroundMaps[0].width; x++) {
                            row.push(0);
                        }
                        currMapData.push(row);
                    }

                    backgroundMap = new ig.BackgroundMap(ig.game.backgroundMaps[0].tilesize, currMapData, ig.game.backgroundMaps[0].tilesetName);
                    backgroundMap.anims = {};
                    backgroundMap.distance = ig.game.backgroundMaps[0].distance;
                    backgroundMap.foreground = false;
                    backgroundMap.name = layerNames[i];
                    backgroundMap.preRender = false;
                    backgroundMap.repeat = false;
                    ig.game.backgroundMaps.push(backgroundMap);
                }
                console.log(ig.game.backgroundMaps);
            }

            // Rename collision map layer name to 'collision' for consistency between map layers
            ig.game.collisionMap.name = 'collision';
        }
    });
});
