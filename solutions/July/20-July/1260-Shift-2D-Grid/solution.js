/**
 * Problem: LeetCode 1260 - Shift 2D Grid
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const total = m * n;

    k %= total;

    const ans = Array.from({ length: m }, () => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const idx = i * n + j;
            const newIdx = (idx + k) % total;

            const r = Math.floor(newIdx / n);
            const c = newIdx % n;

            ans[r][c] = grid[i][j];
        }
    }

    return ans;
};
