/**
 * Problem: LeetCode 1458 - Max Dot Product of Two Subsequences
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function(nums1, nums2) {
    const n = nums1.length;
    const m = nums2.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-Infinity));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const prod = nums1[i - 1] * nums2[j - 1];
            const takeBoth = prod + Math.max(0, dp[i - 1][j - 1]);
            dp[i][j] = Math.max(takeBoth, dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[n][m];
};
