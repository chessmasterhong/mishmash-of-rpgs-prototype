// Grid movement adapted from Joncom's grid-based movement
// https://github.com/Joncom/impact-grid-movement

ig.module(
    'game.entities.abstractities.base_player'
)
.requires(
    'impact.entity'
)
.defines(function() {
    'use strict';

    ig.global.EntityBase_player = ig.Entity.extend({
        size: { x: 32, y: 32 },

        speed: 100,

        moveIntention: null,
        lastMove: null,
        destination: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.maxVel.x = this.maxVel.y = this.speed;
        },

        update: function() {
            this.parent();

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
            } else if(this.isMoving() && this.justReachedDestination() && this.moveIntention && this.canMoveDirectionFromTile(this.destination.x, this.destination.y, this.moveIntention) && this.moveIntention === this.lastMove) {
                this.continueMovingFromDestination();
            } else if(this.isMoving() && this.justReachedDestination() && this.moveIntention && this.canMoveDirectionFromTile(this.destination.x, this.destination.y, this.moveIntention) && this.moveIntention !== this.lastMove) {
                this.changeDirectionAndContinueMoving(this.moveIntention);
            } else if(this.isMoving() && !this.justReachedDestination()) {
                this.continueMovingToDestination();
            } else if(!this.isMoving() && this.moveIntention && this.canMoveDirectionFromCurrentTile(this.moveIntention)) {
                this.startMoving(this.moveIntention);
            }
        },

        getCurrentTile: function() {
            var tileX = this.pos.x / ig.game.TILESIZE,
                tileY = this.pos.y / ig.game.TILESIZE;

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
            this.lastMove = direction;
        },

        continueMovingToDestination: function() {
            this.setVelocityByTile(this.destination.x, this.destination.y, this.speed);
        },

        continueMovingFromDestination: function() {
            this.destination = this.getTileAdjacentToTile(this.destination.x, this.destination.y, this.lastMove);
            this.setVelocityByTile(this.destination.x, this.destination.y, this.speed);
        },

        changeDirectionAndContinueMoving: function(newDirection) {
            this.snapToTile(this.destination.x, this.destination.y);
            this.destination = this.getTileAdjacentToTile(this.destination.x, this.destination.y, newDirection);
            this.setVelocityByTile(this.destination.x, this.destination.y, this.speed);
            this.lastMove = newDirection;
        },

        stopMoving: function() {
            this.snapToTile(this.destination.x, this.destination.y);
            this.destination = null;
            this.vel.x = this.vel.y = 0;
        },

        snapToTile: function(x, y) {
            this.pos.x = x * ig.game.TILESIZE;
            this.pos.y = y * ig.game.TILESIZE;
        },

        justReachedDestination: function() {
            var destinationX = this.destination.x * ig.game.TILESIZE,
                destinationY = this.destination.y * ig.game.TILESIZE;

            return (
                (this.pos.x >= destinationX && this.last.x < destinationX) ||
                (this.pos.x <= destinationX && this.last.x > destinationX) ||
                (this.pos.y >= destinationY && this.last.y < destinationY) ||
                (this.pos.y <= destinationY && this.last.y > destinationY)
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
            )
        },

        canMoveDirectionFromCurrentTile: function(direction) {
            var currTile = this.getCurrentTile();

            return this.canMoveDirectionFromTile(currTile.x, currTile.y, direction);
        },

        setVelocityByTile: function(tileX, tileY, velocity) {
            var tileCenterX = tileX * ig.game.TILESIZE + ig.game.TILESIZE / 2,
                tileCenterY = tileY * ig.game.TILESIZE + ig.game.TILESIZE / 2,
                entityCenterX = this.pos.x + this.size.x / 2,
                entityCenterY = this.pos.y + this.size.y / 2;

            this.vel.x = this.vel.y = 0;
            if(entityCenterX > tileCenterX) {
                this.vel.x = -velocity;
            } else if(entityCenterX < tileCenterX) {
                this.vel.x = velocity;
            } else if(entityCenterY > tileCenterY) {
                this.vel.y = -velocity;
            } else if(entityCenterY < tileCenterY) {
                this.vel.y = velocity;
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
