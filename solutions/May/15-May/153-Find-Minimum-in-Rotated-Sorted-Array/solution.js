/**
 * Problem: LeetCode 153 - Find Minimum in Rotated Sorted Array
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    // Binary search for the inflection point (minimum element)
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        // If middle element is greater than rightmost element,
        // the inflection point lies in the right half (mid + 1 to right)
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Otherwise, the minimum element is at mid or in the left half (left to mid)
            right = mid;
        }
    }

    return nums[left];
};
