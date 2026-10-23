/**
 * Problem: LeetCode 3742 - Maximum Path Score in a Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var maxPathScore = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const maxCost = Math.min(k, m + n - 1);

    let dp = Array.from({ length: n }, () => new Int32Array(maxCost + 1).fill(-1));

    const cost0 = grid[0][0] === 0 ? 0 : 1;
    const score0 = grid[0][0];
    if (cost0 <= maxCost) {
        dp[0][cost0] = score0;
    } else {
        return -1;
    }

    // First row
    for (let c = 1; c < n; c++) {
        const cost = grid[0][c] === 0 ? 0 : 1;
        const score = grid[0][c];
        for (let w = cost; w <= maxCost; w++) {
            if (dp[c - 1][w - cost] !== -1) {
                dp[c][w] = dp[c - 1][w - cost] + score;
            }
        }
    }

    // Remaining rows
    for (let r = 1; r < m; r++) {
        const nextDp = Array.from({ length: n }, () => new Int32Array(maxCost + 1).fill(-1));
        for (let c = 0; c < n; c++) {
            const cost = grid[r][c] === 0 ? 0 : 1;
            const score = grid[r][c];

            for (let w = cost; w <= maxCost; w++) {
                let best = -1;
                if (dp[c][w - cost] !== -1) {
                    best = dp[c][w - cost];
                }
                if (c > 0 && nextDp[c - 1][w - cost] > best) {
                    best = nextDp[c - 1][w - cost];
                }
                if (best !== -1) {
                    nextDp[c][w] = best + score;
                }
            }
        }
        dp = nextDp;
    }

    let maxScore = -1;
    for (let w = 0; w <= maxCost; w++) {
        if (dp[n - 1][w] > maxScore) {
            maxScore = dp[n - 1][w];
        }
    }
    return maxScore;
};
