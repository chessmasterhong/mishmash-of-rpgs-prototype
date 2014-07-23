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

            ig.game.loadLevel(this.maps[startMap.y][startMap.x]);

            var i, x, y, z,
                map, layer,
                layerNames = [];

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
                if(this.getMap(layerNames[i]) === null) {
                    var existingMap = ig.game.backgroundMaps[0],
                        mapData = this.getEmptyMapData(existingMap.width, existingMap.height),
                        backgroundMap = new ig.BackgroundMap(existingMap.tilesize, mapData, existingMap.tilesetName);

                    backgroundMap.anims = {};
                    backgroundMap.distance = existingMap.distance;
                    backgroundMap.foreground = false;
                    backgroundMap.name = layerNames[i];
                    backgroundMap.preRender = false;
                    backgroundMap.repeat = false;
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

            return null;
        },

        getEmptyMapData: function(width, height) {
            var x, y,
                row,
                data = [];

            for(y = 0; y < height; y++) {
                row = [];
                for(x = 0; x < width; x++) {
                    row.push(0);
                }
                data.push(row);
            }

            return data;
        },

        update: function() {
            var i, x, y,
                mapData, entity;

            if(ig.game.screen.y <= 0) {
                // North
                if(this.maps[this.currMap.y - 1]) {
                    mapData = this.maps[this.currMap.y--][this.currMap.x];
                    for(i = 0; i < ig.game.entities.length; i++) {
                        ig.game.entities[i].pos.y = ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize - ig.game.entities[i].pos.y;
                    }

                    for(i = 0; i < mapData.entities.length; i++) {
                        entity = mapData.entities[i];
                        ig.game.spawnEntity(
                            entity.type,
                            entity.x,
                            ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize - entity.y,
                            entity.settings
                        );
                    }

                    for(i = 0; i < ig.game.backgroundMaps.length; i++) {
                        this.extendMap(ig.game.backgroundMaps[i], mapData, 'n');
                    }

                    if(ig.game.collisionMap.data) {
                        this.extendMap(ig.game.collisionMap, mapData, 'n');
                    }
                }
            }

            if(ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize - ig.game.screen.y <= ig.system.height) {
                // South
                if(this.maps[this.currMap.y + 1]) {
                    mapData = this.maps[this.currMap.y++][this.currMap.x];
                    for(i = 0; i < mapData.entities.length; i++) {
                        entity = mapData.entities[i];
                        ig.game.spawnEntity(
                            entity.type,
                            entity.x,
                            entity.y + ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize,
                            entity.settings
                        );
                    }

                    for(i = 0; i < ig.game.backgroundMaps.length; i++) {
                        this.extendMap(ig.game.backgroundMaps[i], mapData, 's');
                    }

                    if(ig.game.collisionMap.data) {
                        this.extendMap(ig.game.collisionMap, mapData, 's');
                    }
                }
            }

            if(ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - ig.game.screen.x <= ig.system.width) {
                // East
                if(this.maps[this.currMap.y][this.currMap.x + 1]) {
                    mapData = this.maps[this.currMap.y][this.currMap.x++];
                    for(i = 0; i < mapData.entities.length; i++) {
                        entity = mapData.entities[i];
                        ig.game.spawnEntity(
                            entity.type,
                            entity.x + ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize,
                            entity.y,
                            entity.settings
                        );
                    }

                    for(i = 0; i < ig.game.backgroundMaps.length; i++) {
                        this.extendMap(ig.game.backgroundMaps[i], mapData, 'e');
                    }

                    if(ig.game.collisionMap.data) {
                        this.extendMap(ig.game.collisionMap, mapData, 'e');
                    }
                }
            }

            if(ig.game.screen.x <= 0) {
                // West
                if(this.maps[this.currMap.y][this.currMap.x - 1]) {
                    mapData = this.maps[this.currMap.y][this.currMap.x--];
                    for(i = 0; i < ig.game.entities.length; i++) {
                        ig.game.entities[i].pos.x = ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - ig.game.entities[i].pos.x;
                    }

                    for(i = 0; i < mapData.entities.length; i++) {
                        entity = mapData.entities[i];
                        ig.game.spawnEntity(
                            entity.type,
                            ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - entity.x,
                            entity.y,
                            entity.settings
                        );
                    }

                    for(i = 0; i < ig.game.backgroundMaps.length; i++) {
                        this.extendMap(ig.game.backgroundMaps[i], mapData, 'w');
                    }

                    if(ig.game.collisionMap.data) {
                        this.extendMap(ig.game.collisionMap, mapData, 'w');
                    }
                }
            }
        },

        extendMap: function(mapData, map, direction) {
            var i,
                layer = this.getLayer(mapData.name, map);

            if(layer === null) {
                layer = {
                    data: this.getEmptyMapData(
                        map.layer[0].data.length,
                        map.layer[0].data[0].length
                    ),
                    width: map.layer[0].data[0].length,
                    height: map.layer.length
                };
            }

            if(direction === 'n') {
                mapData.data.push.apply(layer.data, mapData.data);
                mapData.height += layer.height;
            } else if(direction === 's') {
                mapData.data.push.apply(mapData.data, layer.data);
                mapData.height += layer.height;
            } else if(direction === 'e') {
                for(i = 0; i < mapData.data.length; i++) {
                    mapData.data[i].push.apply(mapData.data[i], layer.data[i]);
                }
                mapData.width += layer.width;
            } else if(direction === 'w') {
                for(i = 0; i < mapData.data.length; i++) {
                    mapData.data[i].push.apply(layer.data[i], mapData.data[i]);
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

            return null;
        }
    });
});
