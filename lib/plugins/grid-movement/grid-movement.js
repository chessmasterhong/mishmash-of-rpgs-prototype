/**
 *  @fileOverview Grid-based movement in ImpactJS. Source code adapted from
 *    Joncom's grid-based movement.
 *  @see {@link https://github.com/Joncom/impact-grid-movement} for original source code.
 */

ig.module(
    'plugins.grid-movement.grid-movement'
)
.requires(
    'impact.impact'
)
.defines(function() {
    'use strict';

    ig.global.GridMovement = ig.Class.extend({
        entity: null,

        speed: 100,

        moveIntention: null,
        lastMove: null,
        destination: null,

        init: function(entity) {
            this.entity = entity;
            this.entity.maxVel.x = this.entity.maxVel.y = this.speed;
        },

        update: function() {
            this.moveIntention = null;
            if(ig.input.state('UP')) {
                this.moveIntention = moveType.UP;
            } else if(ig.input.state('DOWN')) {
                this.moveIntention = moveType.DOWN;
            } else if(ig.input.state('LEFT')) {
                this.moveIntention = moveType.LEFT;
            } else if(ig.input.state('RIGHT')) {
                this.moveIntention = moveType.RIGHT;
            }

            if(this.isMoving() && this.justReachedDestination() && !this.moveIntention) {
                this.stopMoving();
            } else if(this.isMoving() && this.justReachedDestination() && this.moveIntention && !this.canMoveDirectionFromTile(this.destination.x, this.destination.y, this.moveIntention)) {
                this.stopMoving();
            } else if(this.isMoving() && this.justReachedDestination() && this.moveIntention && this.canMoveDirectionFromTile(this.destination.x, this.destination.y, this.moveIntention) && this.moveIntention === this.entity.lastMove) {
                this.continueMovingFromDestination();
            } else if(this.isMoving() && this.justReachedDestination() && this.moveIntention && this.canMoveDirectionFromTile(this.destination.x, this.destination.y, this.moveIntention) && this.moveIntention !== this.entity.lastMove) {
                this.changeDirectionAndContinueMoving(this.moveIntention);
            } else if(this.isMoving() && !this.justReachedDestination()) {
                this.continueMovingToDestination();
            } else if(!this.isMoving() && this.moveIntention && this.canMoveDirectionFromCurrentTile(this.moveIntention)) {
                this.startMoving(this.moveIntention);
            }
        },

        getCurrentTile: function() {
            var tileX = this.entity.pos.x / ig.game.TILESIZE,
                tileY = this.entity.pos.y / ig.game.TILESIZE;

            return { x: tileX, y: tileY };
        },

        getTileAdjacentToTile: function(tileX, tileY, direction) {
            if(direction === moveType.UP) {
                tileY += -1;
            } else if(direction === moveType.DOWN) {
                tileY += 1;
            } else if(direction === moveType.LEFT) {
                tileX += -1;
            } else if(direction === moveType.RIGHT) {
                tileX += 1;
            }

            return { x: tileX, y: tileY };
        },

        startMoving: function(direction) {
            var currTile = this.getCurrentTile();
            this.destination = this.getTileAdjacentToTile(currTile.x, currTile.y, direction);
            this.setVelocityByTile(this.destination.x, this.destination.y, this.speed);
            this.entity.lastMove = direction;
        },

        continueMovingToDestination: function() {
            this.setVelocityByTile(this.destination.x, this.destination.y, this.speed);
        },

        continueMovingFromDestination: function() {
            this.destination = this.getTileAdjacentToTile(this.destination.x, this.destination.y, this.entity.lastMove);
            this.setVelocityByTile(this.destination.x, this.destination.y, this.speed);
        },

        changeDirectionAndContinueMoving: function(newDirection) {
            this.snapToTile(this.destination.x, this.destination.y);
            this.destination = this.getTileAdjacentToTile(this.destination.x, this.destination.y, newDirection);
            this.setVelocityByTile(this.destination.x, this.destination.y, this.speed);
            this.entity.lastMove = newDirection;
        },

        stopMoving: function() {
            this.snapToTile(this.destination.x, this.destination.y);
            this.destination = null;
            this.entity.vel.x = this.entity.vel.y = 0;
        },

        snapToTile: function(x, y) {
            this.entity.pos.x = x * ig.game.TILESIZE;
            this.entity.pos.y = y * ig.game.TILESIZE;
        },

        justReachedDestination: function() {
            var destinationX = this.destination.x * ig.game.TILESIZE,
                destinationY = this.destination.y * ig.game.TILESIZE;

            return (
                (this.entity.pos.x >= destinationX && this.entity.last.x < destinationX) ||
                (this.entity.pos.x <= destinationX && this.entity.last.x > destinationX) ||
                (this.entity.pos.y >= destinationY && this.entity.last.y < destinationY) ||
                (this.entity.pos.y <= destinationY && this.entity.last.y > destinationY)
            );
        },

        isMoving: function() {
            return this.destination !== null;
        },

        canMoveDirectionFromTile: function(tileX, tileY, direction) {
            var newPos = this.getTileAdjacentToTile(tileX, tileY, direction);

            return (
                typeof ig.game.collisionMap.data[newPos.y] !== 'undefined' ?
                    ig.game.collisionMap.data[newPos.y][newPos.x] === 0 : false
            );
        },

        canMoveDirectionFromCurrentTile: function(direction) {
            var currTile = this.getCurrentTile();

            return this.canMoveDirectionFromTile(currTile.x, currTile.y, direction);
        },

        setVelocityByTile: function(tileX, tileY, velocity) {
            var tileCenterX = tileX * ig.game.TILESIZE + ig.game.TILESIZE / 2,
                tileCenterY = tileY * ig.game.TILESIZE + ig.game.TILESIZE / 2,
                entityCenterX = this.entity.pos.x + this.entity.size.x / 2,
                entityCenterY = this.entity.pos.y + this.entity.size.y / 2;

            this.entity.vel.x = this.entity.vel.y = 0;
            if(entityCenterX > tileCenterX) {
                this.entity.vel.x = -velocity;
            } else if(entityCenterX < tileCenterX) {
                this.entity.vel.x = velocity;
            } else if(entityCenterY > tileCenterY) {
                this.entity.vel.y = -velocity;
            } else if(entityCenterY < tileCenterY) {
                this.entity.vel.y = velocity;
            } 
        }
    });

    var moveType = {
        'UP': 1,
        'DOWN': 2,
        'LEFT': 4,
        'RIGHT': 8
    };
});
