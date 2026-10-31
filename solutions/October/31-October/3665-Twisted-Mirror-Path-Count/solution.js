/**
 * Problem: LeetCode 3665 - Twisted Mirror Path Count
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePaths = function(grid) {
    const MOD = 1000000007;
    const m = grid.length;
    const n = grid[0].length;

    // f[i][j][0] = entering (i, j) moving Right
    // f[i][j][1] = entering (i, j) moving Down
    const f = Array.from({ length: m + 1 }, () =>
        Array.from({ length: n + 1 }, () => new Int32Array(2))
    );

    f[0][0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const fromRight = f[i][j][0];
            const fromDown = f[i][j][1];

            if (grid[i][j] === 0) {
                const total = (fromRight + fromDown) % MOD;
                // move right
                f[i][j + 1][0] = (f[i][j + 1][0] + total) % MOD;
                // move down
                f[i + 1][j][1] = (f[i + 1][j][1] + total) % MOD;
            } else {
                // entered mirror moving right -> deflected down
                f[i + 1][j][1] = (f[i + 1][j][1] + fromRight) % MOD;
                // entered mirror moving down -> deflected right
                f[i][j + 1][0] = (f[i][j + 1][0] + fromDown) % MOD;
            }
        }
    }

    return (f[m - 1][n - 1][0] + f[m - 1][n - 1][1]) % MOD;
};
