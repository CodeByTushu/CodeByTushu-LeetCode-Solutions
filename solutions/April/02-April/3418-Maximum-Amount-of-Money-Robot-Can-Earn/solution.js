/**
 * Problem: LeetCode 3418 - Maximum Amount of Money Robot Can Earn
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function(coins) {
    const m = coins.length;
    const n = coins[0].length;
    const NEG_INF = -1e9;

    // dp[i][j][k]: max profit reaching (i, j) with k neutralizations used (k in {0, 1, 2})
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => [NEG_INF, NEG_INF, NEG_INF])
    );

    // Base case at (0, 0)
    dp[0][0][0] = coins[0][0];
    if (coins[0][0] < 0) {
        dp[0][0][1] = 0;
        dp[0][0][2] = 0;
    } else {
        dp[0][0][1] = coins[0][0];
        dp[0][0][2] = coins[0][0];
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            for (let k = 0; k < 3; k++) {
                let maxVal = NEG_INF;

                // From top (i - 1, j)
                if (i > 0) {
                    if (dp[i - 1][j][k] !== NEG_INF) {
                        maxVal = Math.max(maxVal, dp[i - 1][j][k] + coins[i][j]);
                    }
                    if (k > 0 && coins[i][j] < 0 && dp[i - 1][j][k - 1] !== NEG_INF) {
                        maxVal = Math.max(maxVal, dp[i - 1][j][k - 1]);
                    }
                }

                // From left (i, j - 1)
                if (j > 0) {
                    if (dp[i][j - 1][k] !== NEG_INF) {
                        maxVal = Math.max(maxVal, dp[i][j - 1][k] + coins[i][j]);
                    }
                    if (k > 0 && coins[i][j] < 0 && dp[i][j - 1][k - 1] !== NEG_INF) {
                        maxVal = Math.max(maxVal, dp[i][j - 1][k - 1]);
                    }
                }

                dp[i][j][k] = maxVal;
            }
        }
    }

    return Math.max(dp[m - 1][n - 1][0], dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]);
};
