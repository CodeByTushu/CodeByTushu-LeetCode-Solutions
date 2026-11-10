/**
 * Problem: LeetCode 3693 - Climbing Stairs II
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function(n, costs) {
    const dp = new Array(n + 1).fill(0);

    for (let j = 1; j <= n; j++) {
        let best = Infinity;
        // Jump from j-1, j-2, or j-3 (where valid step >= 0)
        for (let d = 1; d <= 3 && j - d >= 0; d++) {
            const cand = dp[j - d] + costs[j - 1] + d * d;
            if (cand < best) best = cand;
        }
        dp[j] = best;
    }

    return dp[n];
};
