/**
 * Problem: LeetCode 1871 - Jump Game VII
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function(s, minJump, maxJump) {
    const n = s.length;
    if (s[n - 1] === '1') {
        return false;
    }

    const dp = new Uint8Array(n);
    dp[0] = 1;
    let reachableInWindow = 0;

    for (let i = 1; i < n; i++) {
        if (i >= minJump && dp[i - minJump]) {
            reachableInWindow++;
        }
        if (i > maxJump && dp[i - maxJump - 1]) {
            reachableInWindow--;
        }

        if (s[i] === '0' && reachableInWindow > 0) {
            dp[i] = 1;
        }
    }

    return dp[n - 1] === 1;
};
