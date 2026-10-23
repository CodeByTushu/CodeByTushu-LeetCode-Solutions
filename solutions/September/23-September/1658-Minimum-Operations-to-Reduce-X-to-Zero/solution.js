/**
 * Problem: LeetCode 1658 - Minimum Operations to Reduce X to Zero
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function(nums, x) {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    const target = total - x;
    if (target < 0) return -1;
    if (target === 0) return nums.length;

    let maxLen = -1;
    let windowSum = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        windowSum += nums[right];
        while (windowSum > target && left <= right) {
            windowSum -= nums[left];
            left++;
        }
        if (windowSum === target) {
            maxLen = Math.max(maxLen, right - left + 1);
        }
    }

    return maxLen === -1 ? -1 : nums.length - maxLen;
};
