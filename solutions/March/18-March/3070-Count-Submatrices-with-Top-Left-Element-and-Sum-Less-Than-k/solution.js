/**
 * Problem: LeetCode 3070 - Count Submatrices with Top-Left Element and Sum Less Than k
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countSubmatrices = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i > 0) {
                grid[i][j] += grid[i - 1][j];
            }
            if (j > 0) {
                grid[i][j] += grid[i][j - 1];
            }
            if (i > 0 && j > 0) {
                grid[i][j] -= grid[i - 1][j - 1];
            }

            if (grid[i][j] <= k) {
                count++;
            }
        }
    }

    return count;
};
