/**
 * Problem: LeetCode 3651 - Minimum Cost Path with Teleportations
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Dynamic Programming + Suffix Minimum Optimization
 * Time Complexity: O(k * (m * n + maxVal))
 * Space Complexity: O(m * n + maxVal)
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var minCost = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;

    let maxVal = 0;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] > maxVal) {
                maxVal = grid[r][c];
            }
        }
    }

    const INF = 1e15;
    let dp = Array.from({ length: m }, () => Array(n).fill(INF));

    // Base case: starting at (0, 0) costs 0
    dp[0][0] = 0;

    // Base layer (0 teleportations): normal moves only
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (r > 0 && dp[r - 1][c] !== INF) {
                dp[r][c] = Math.min(dp[r][c], dp[r - 1][c] + grid[r][c]);
            }
            if (c > 0 && dp[r][c - 1] !== INF) {
                dp[r][c] = Math.min(dp[r][c], dp[r][c - 1] + grid[r][c]);
            }
        }
    }

    // Up to k teleportations
    for (let t = 0; t < k; t++) {
        const minAtVal = Array(maxVal + 1).fill(INF);

        // Record minimum cost reachable at each cell value
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                const val = grid[r][c];
                if (dp[r][c] < minAtVal[val]) {
                    minAtVal[val] = dp[r][c];
                }
            }
        }

        // suffMin[v] = min cost to reach any cell with value >= v
        const suffMin = Array(maxVal + 1).fill(INF);
        let curMin = INF;
        for (let v = maxVal; v >= 0; v--) {
            if (minAtVal[v] < curMin) {
                curMin = minAtVal[v];
            }
            suffMin[v] = curMin;
        }

        const nextDp = Array.from({ length: m }, () => Array(n).fill(INF));

        // Teleportation step (cost 0)
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                nextDp[r][c] = Math.min(dp[r][c], suffMin[grid[r][c]]);
            }
        }

        // Normal moves step after teleportation
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (r > 0 && nextDp[r - 1][c] !== INF) {
                    nextDp[r][c] = Math.min(nextDp[r][c], nextDp[r - 1][c] + grid[r][c]);
                }
                if (c > 0 && nextDp[r][c - 1] !== INF) {
                    nextDp[r][c] = Math.min(nextDp[r][c], nextDp[r][c - 1] + grid[r][c]);
                }
            }
        }

        dp = nextDp;
    }

    return dp[m - 1][n - 1];
};
