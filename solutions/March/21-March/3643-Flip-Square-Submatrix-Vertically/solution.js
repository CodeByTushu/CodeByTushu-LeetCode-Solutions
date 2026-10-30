/**
 * Problem: 3643. Flip Square Submatrix Vertically
 * Difficulty: Easy
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * We identify the submatrix rows starting at index x up to x + k - 1,
 * and columns starting at index y up to y + k - 1.
 * We flip the rows vertically in-place using two pointers: top and bottom.
 * 
 * Time Complexity: O(k^2)
 * Space Complexity: O(1) auxiliary space
 * 
 * @param {number[][]} grid
 * @param {number} x
 * @param {number} y
 * @param {number} k
 * @return {number[][]}
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
