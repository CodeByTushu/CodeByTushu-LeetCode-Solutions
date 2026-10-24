/**
 * Problem: LeetCode 712 - Minimum ASCII Delete Sum for Two Strings
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // Base cases: cost of deleting all characters from s1 or s2
    for (let i = 1; i <= m; i++) {
        dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
    }
    for (let j = 1; j <= n; j++) {
        dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
    }

    // DP state transitions
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + s1.charCodeAt(i - 1),
                    dp[i][j - 1] + s2.charCodeAt(j - 1)
                );
            }
        }
    }

    return dp[m][n];
};
