/**
 *  @fileOverview A map stitching plugin for ImpactJS. Connects multiple maps
 *    together in a configurable order to create a "super map". Allows dynamic
 *    loading and unloading of map resources based on current section of the
 *    "super map" while providing seamless transition moving between sections.
 *  @author Kevin Chan {@link https://github.com/chessmasterhong|(chessmasterhong)}
 *  @license {@link https://github.com/chessmasterhong/impact-atmosphere/blob/master/LICENCE|MIT License}
 *  @see Inspired and derived from {@link https://github.com/tmacie/impact-infinite|tmacie's impact-infinite}
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

            ig.game.loadLevel(JSON.parse(JSON.stringify(this.maps[startMap.y][startMap.x])));

            var i, x, y, z;
            var map, layer;
            var layerNames = [];

            for(y = 0; y < this.maps.length; y++) {
                for(x = 0; x < this.maps[y].length; x++) {
                    map = this.maps[y][x];
                    for(z = 0; z < map.layer.length; z++) {
                        layer = map.layer[z];
                        if(layerNames.indexOf(layer.name) === -1) {
                            layerNames.push(layer.name);
                        }
                    }
                }
            }

            for(i = 0; i < layerNames.length; i++) {
                if(!this.getMap(layerNames[i])) {
                    var existingMap = ig.game.backgroundMaps[0];
                    var mapData = this.getEmptyMapData(existingMap.width, existingMap.height);

                    var backgroundMap = new ig.BackgroundMap(existingMap.tilesize, mapData, existingMap.tilesetName);
                    backgroundMap.anims = {};
                    backgroundMap.repeat = false;
                    backgroundMap.distance = existingMap.distance;
                    backgroundMap.foreground = false;
                    backgroundMap.preRender = false;
                    backgroundMap.name = layerNames[i];
                    ig.game.backgroundMaps.push(backgroundMap);
                }
            }

            ig.game.collisionMap.name = 'collision';
        },

        getMap: function(layerName) {
            for(var i = 0; i < ig.game.backgroundMaps.length; i++) {
                if(layerName === ig.game.backgroundMaps[i].name) {
                    return ig.game.backgroundMaps[i];
                } else if(layerName === 'collision') {
                    return ig.game.collisionMap;
                }
            }

            return false;
        },

        getEmptyMapData: function(width, height) {
            var data = [];
            for(var j = 0; j < height; j++) {
                var row = [];
                for(var k = 0; k < width; k++) {
                    row.push(0);
                }

                data.push(row);
            }

            return data;
        },

        update: function() {
            var i, nextMapData, entity;

            if(ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - ig.game.screen.x <= ig.system.width) {
                // East
                if(this.maps[this.currMap.y][this.currMap.x + 1]) {
                    nextMapData = this.maps[this.currMap.y][this.currMap.x++];
                    for(i = 0; i < nextMapData.entities.length; i++) {
                        entity = nextMapData.entities[i];
                        ig.game.spawnEntity(
                            entity.type,
                            entity.x + (ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize),
                            entity.y,
                            entity.settings
                        );
                    }

                    for(i = 0; i < ig.game.backgroundMaps.length; i++) {
                        this.extendMap(ig.game.backgroundMaps[i], nextMapData, 'e');
                    }

                    if(ig.game.collisionMap.data) {
                        this.extendMap(ig.game.collisionMap, nextMapData, 'e');
                    }
                }
            }
        },

        extendMap: function(mapData, map, direction) {
            var layer = this.getLayer(mapData.name, map);

            if(!layer) {
                layer = {
                    data: this.getEmptyMapData(
                        map.layer[0].data.length,
                        map.layer[0].data[0].length
                    ),
                    width: map.layer[0].data[0].length,
                    height: map.layer.length
                };
            }

            if(direction === 's') {
                mapData.data.push.apply(mapData.data, layer.data);
                mapData.height += layer.height;
            } else if(direction === 'e') {
                for(var i = 0; i < mapData.data.length; i++) {
                    mapData.data[i].push.apply(mapData.data[i], layer.data[i]);
                }
                mapData.width += layer.width;
            }
        },

        getLayer: function(layerName, map) {
            for(var i = 0; i < map.layer.length; i++) {
                if(layerName === map.layer[i].name) {
                    return map.layer[i];
                }
            }

            return false;
        }
    });
});
