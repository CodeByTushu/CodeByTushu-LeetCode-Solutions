/**
 * Problem: LeetCode 3643 - Flip Square Submatrix Vertically
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
var flipSubmatrix = function(grid, x, y, k) {
    let top = x;
    let bottom = x + k - 1;

    while (top < bottom) {
        for (let j = y; j < y + k; j++) {
            const temp = grid[top][j];
            grid[top][j] = grid[bottom][j];
            grid[bottom][j] = temp;
        }
        top++;
        bottom--;
    }

    return grid;
};
