/**
 * Problem: LeetCode 2770 - Maximum Number of Jumps to Reach the Last Index
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maximumJumps = function(nums, target) {
    const n = nums.length;
    const dp = new Int32Array(n).fill(-1);
    dp[0] = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] !== -1) {
                const diff = nums[i] - nums[j];
                if (diff >= -target && diff <= target) {
                    if (dp[j] + 1 > dp[i]) {
                        dp[i] = dp[j] + 1;
                    }
                }
            }
        }
    }

    return dp[n - 1];
};
