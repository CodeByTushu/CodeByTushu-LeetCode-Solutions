/**
 * Problem: LeetCode 3660 - Jump Game IX
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var maxValue = function(nums) {
    const n = nums.length;
    const preMax = new Array(n);
    preMax[0] = nums[0];
    for (let i = 1; i < n; i++) {
        preMax[i] = Math.max(preMax[i - 1], nums[i]);
    }

    const ans = new Array(n);
    let sufMin = Infinity;
    for (let i = n - 1; i >= 0; i--) {
        ans[i] = preMax[i] > sufMin ? ans[i + 1] : preMax[i];
        sufMin = Math.min(sufMin, nums[i]);
    }

    return ans;
};
