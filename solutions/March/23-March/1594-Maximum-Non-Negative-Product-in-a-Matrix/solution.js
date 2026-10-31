/**
 * Problem: LeetCode 1594 - Maximum Non Negative Product in a Matrix
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var maxProductPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const maxProd = Array.from({ length: m }, () => new Array(n).fill(0n));
    const minProd = Array.from({ length: m }, () => new Array(n).fill(0n));

    maxProd[0][0] = minProd[0][0] = BigInt(grid[0][0]);

    for (let j = 1; j < n; j++) {
        maxProd[0][j] = minProd[0][j] = maxProd[0][j - 1] * BigInt(grid[0][j]);
    }

    for (let i = 1; i < m; i++) {
        maxProd[i][0] = minProd[i][0] = maxProd[i - 1][0] * BigInt(grid[i][0]);
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            const val = BigInt(grid[i][j]);
            const c1 = maxProd[i - 1][j] * val;
            const c2 = minProd[i - 1][j] * val;
            const c3 = maxProd[i][j - 1] * val;
            const c4 = minProd[i][j - 1] * val;

            let mx = c1, mn = c1;
            for (const c of [c2, c3, c4]) {
                if (c > mx) mx = c;
                if (c < mn) mn = c;
            }
            maxProd[i][j] = mx;
            minProd[i][j] = mn;
        }
    }

    const ans = maxProd[m - 1][n - 1];
    if (ans < 0n) return -1;

    const MOD = 1000000007n;
    return Number(ans % MOD);
};
