/**
 * Problem: LeetCode 1878 - Get Biggest Three Rhombus Sums in a Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var getBiggestThree = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const sums = new Set();

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            // Area 0 rhombus
            sums.add(grid[r][c]);

            // Area > 0 rhombuses with radius L
            for (let L = 1; r - L >= 0 && r + L < m && c - L >= 0 && c + L < n; L++) {
                let sum = 0;
                for (let i = 0; i < L; i++) {
                    sum += grid[r - L + i][c + i];     // top to right
                    sum += grid[r + i][c + L - i];     // right to bottom
                    sum += grid[r + L - i][c - i];     // bottom to left
                    sum += grid[r - i][c - L + i];     // left to top
                }
                sums.add(sum);
            }
        }
    }

    const sorted = Array.from(sums).sort((a, b) => b - a);
    return sorted.slice(0, 3);
};
