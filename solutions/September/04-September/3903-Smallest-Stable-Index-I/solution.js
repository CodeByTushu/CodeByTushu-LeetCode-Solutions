/**
 * Problem: LeetCode 3903 - Smallest Stable Index I
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function(nums, k) {
    const n = nums.length;
    const prefixMax = new Array(n);
    prefixMax[0] = nums[0];
    for (let i = 1; i < n; i++) {
        prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
    }

    const suffixMin = new Array(n);
    suffixMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);
    }

    for (let i = 0; i < n; i++) {
        const instability = prefixMax[i] - suffixMin[i];
        if (instability <= k) {
            return i;
        }
    }

    return -1;
};
