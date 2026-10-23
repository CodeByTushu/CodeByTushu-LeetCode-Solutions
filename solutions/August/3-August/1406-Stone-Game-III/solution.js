/**
 * Problem: LeetCode 1406 - Stone Game III
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function(stoneValue) {
    const n = stoneValue.length;
    const dp = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let take = 0;
        let best = -Infinity;
        for (let k = 0; k < 3 && i + k < n; k++) {
            take += stoneValue[i + k];
            best = Math.max(best, take - dp[i + k + 1]);
        }
        dp[i] = best;
    }

    if (dp[0] > 0) return "Alice";
    if (dp[0] < 0) return "Bob";
    return "Tie";
};
