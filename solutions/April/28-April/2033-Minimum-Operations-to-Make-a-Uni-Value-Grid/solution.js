/**
 * Problem: LeetCode 2033 - Minimum Operations to Make a Uni-Value Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
var minOperations = function(grid, x) {
    const vals = [];
    const rem = grid[0][0] % x;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] % x !== rem) {
                return -1;
            }
            vals.push(grid[i][j]);
        }
    }

    vals.sort((a, b) => a - b);
    const median = vals[Math.floor(vals.length / 2)];
    let operations = 0;

    for (let i = 0; i < vals.length; i++) {
        operations += Math.floor(Math.abs(vals[i] - median) / x);
    }

    return operations;
};
