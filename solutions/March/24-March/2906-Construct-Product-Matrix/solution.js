/**
 * Problem: LeetCode 2906 - Construct Product Matrix
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var constructProductMatrix = function(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const MOD = 12345;
    const p = Array.from({ length: n }, () => new Int32Array(m));

    let prefix = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            p[i][j] = prefix;
            prefix = (prefix * (grid[i][j] % MOD)) % MOD;
        }
    }

    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            p[i][j] = (p[i][j] * suffix) % MOD;
            suffix = (suffix * (grid[i][j] % MOD)) % MOD;
        }
    }

    return p.map(row => Array.from(row));
};
