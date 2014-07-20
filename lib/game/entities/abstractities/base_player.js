/**
 *  @fileOverview Basic player entity with common player logics. This is an
 *    abstract entity that should be extended.
 */

ig.module(
    'game.entities.abstractities.base_player'
)
.requires(
    'impact.entity',
    'plugins.grid-movement.grid-movement'
)
.defines(function() {
    'use strict';

    ig.global.EntityBase_player = ig.Entity.extend({
        size: { x: 32, y: 32 },

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.gridMovement = new ig.global.GridMovement(this);
        },

        update: function() {
            this.parent();

            this.gridMovement.update();
        }
    });
});
