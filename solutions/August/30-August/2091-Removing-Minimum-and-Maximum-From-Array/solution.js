/**
 * Problem: LeetCode 2091 - Removing Minimum and Maximum From Array
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeletions = function(nums) {
    const n = nums.length;
    if (n <= 2) return n;

    // Find indices of min and max
    let minIdx = 0;
    let maxIdx = 0;
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIdx]) minIdx = i;
        if (nums[i] > nums[maxIdx]) maxIdx = i;
    }

    // Make sure left <= right for convenience
    const left = Math.min(minIdx, maxIdx);
    const right = Math.max(minIdx, maxIdx);

    // Strategy 1: Both from front -> remove up to right + 1 elements
    const bothFront = right + 1;

    // Strategy 2: Both from back -> remove from left to end
    const bothBack = n - left;

    // Strategy 3: left from front, right from back
    const splitWay = (left + 1) + (n - right);

    return Math.min(bothFront, bothBack, splitWay);
};
