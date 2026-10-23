/**
 * Problem: LeetCode 154 - Find Minimum in Rotated Sorted Array II
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    // Binary search with duplicate handling
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        if (nums[mid] > nums[right]) {
            // Inflection point is strictly in the right half
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            // Right half is sorted, inflection point is at mid or in left half
            right = mid;
        } else {
            // nums[mid] === nums[right]: duplicate detected, safely shrink right boundary
            right--;
        }
    }

    return nums[left];
};
