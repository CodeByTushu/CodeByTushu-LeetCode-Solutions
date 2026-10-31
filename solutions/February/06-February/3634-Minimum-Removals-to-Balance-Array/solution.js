/**
 * Problem: LeetCode 3634 - Minimum Removals to Balance Array
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minRemoval = function(nums, k) {
    const n = nums.length;
    nums.sort((a, b) => a - b);

    let maxKept = 1;
    let right = 0;

    for (let left = 0; left < n; left++) {
        const limit = nums[left] * k;
        while (right < n && nums[right] <= limit) {
            right++;
        }
        maxKept = Math.max(maxKept, right - left);
    }

    return n - maxKept;
};
