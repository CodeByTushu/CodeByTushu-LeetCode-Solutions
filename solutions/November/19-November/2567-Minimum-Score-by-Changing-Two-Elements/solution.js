/**
 * Problem: LeetCode 2567 - Minimum Score by Changing Two Elements
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimizeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;

    // Low score can always be 0 by making two elements equal.
    // We only need to minimize the high score (max - min) after modifying 2 elements.
    const opt1 = nums[n - 1] - nums[2];     // Modify 2 smallest elements
    const opt2 = nums[n - 2] - nums[1];     // Modify 1 smallest + 1 largest element
    const opt3 = nums[n - 3] - nums[0];     // Modify 2 largest elements

    return Math.min(opt1, opt2, opt3);
};
