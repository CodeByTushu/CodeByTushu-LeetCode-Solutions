/**
 * Problem: LeetCode 1914 - Cyclically Rotating a Grid
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var rotateGrid = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const layers = Math.min(m, n) / 2;

    for (let l = 0; l < layers; l++) {
        const r1 = l, c1 = l;
        const r2 = m - 1 - l, c2 = n - 1 - l;

        const positions = [];
        // 1. Left col: top to bottom
        for (let r = r1; r <= r2; r++) positions.push([r, c1]);
        // 2. Bottom row: left to right
        for (let c = c1 + 1; c <= c2; c++) positions.push([r2, c]);
        // 3. Right col: bottom to top
        for (let r = r2 - 1; r >= r1; r--) positions.push([r, c2]);
        // 4. Top row: right to left
        for (let c = c2 - 1; c >= c1 + 1; c--) positions.push([r1, c]);

        const L = positions.length;
        const vals = new Array(L);
        for (let i = 0; i < L; i++) {
            vals[i] = grid[positions[i][0]][positions[i][1]];
        }

        const shift = k % L;
        for (let i = 0; i < L; i++) {
            const [tr, tc] = positions[(i + shift) % L];
            grid[tr][tc] = vals[i];
        }
    }

    return grid;
};
