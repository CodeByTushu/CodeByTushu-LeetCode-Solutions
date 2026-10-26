/**
 * Problem: LeetCode 3010 - Divide an Array Into Subarrays With Minimum Cost I
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumCost = function(nums) {
    // The first subarray always begins at index 0, fixing nums[0].
    const firstCost = nums[0];
    let min1 = Infinity;
    let min2 = Infinity;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < min1) {
            min2 = min1;
            min1 = nums[i];
        } else if (nums[i] < min2) {
            min2 = nums[i];
        }
    }

    return firstCost + min1 + min2;
};
