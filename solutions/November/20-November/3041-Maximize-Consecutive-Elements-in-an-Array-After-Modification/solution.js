/**
 * Problem: LeetCode 3041 - Maximize Consecutive Elements in an Array After Modification
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSelectedElements = function(nums) {
    nums.sort((a, b) => a - b);

    // dp[v] = length of longest consecutive chain ending at value v
    const dp = new Int32Array(1000003);
    let ans = 1;

    for (let i = 0; i < nums.length; i++) {
        const x = nums[i];
        // Update x + 1 before x to prevent duplicate usage of current element
        dp[x + 1] = dp[x] + 1;
        dp[x] = dp[x - 1] + 1;

        if (dp[x + 1] > ans) ans = dp[x + 1];
        if (dp[x] > ans) ans = dp[x];
    }

    return ans;
};
