/**
 * Problem: LeetCode 2069 - Walking Robot Simulation II
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var Robot = function(width, height) {
    this.perimeter = 2 * (width + height) - 4;
    this.coords = [];
    this.dirs = [];
    this.idx = 0;
    this.moved = false;

    // Bottom row
    for (let i = 0; i < width; i++) {
        this.coords.push([i, 0]);
        this.dirs.push("East");
    }
    // Right col
    for (let j = 1; j < height; j++) {
        this.coords.push([width - 1, j]);
        this.dirs.push("North");
    }
    // Top row
    for (let i = width - 2; i >= 0; i--) {
        this.coords.push([i, height - 1]);
        this.dirs.push("West");
    }
    // Left col
    for (let j = height - 2; j > 0; j--) {
        this.coords.push([0, j]);
        this.dirs.push("South");
    }

    this.dirs[0] = "South";
};

/** 
 * @param {number} num
 * @return {void}
 */
Robot.prototype.step = function(num) {
    this.moved = true;
    this.idx = (this.idx + num) % this.perimeter;
};

/**
 * @return {number[]}
 */
Robot.prototype.getPos = function() {
    return this.coords[this.idx];
};

/**
 * @return {string}
 */
Robot.prototype.getDir = function() {
    if (!this.moved) return "East";
    return this.dirs[this.idx];
};
