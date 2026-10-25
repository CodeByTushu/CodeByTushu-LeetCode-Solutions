/**
 * Problem: LeetCode 1984 - Minimum Difference Between Highest and Lowest of K Scores
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Sorting + Sliding Window Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (or O(log n) for sorting)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function(nums, k) {
    if (k <= 1) {
        return 0;
    }

    nums.sort((a, b) => a - b);
    let minDiff = Infinity;

    for (let i = 0; i + k - 1 < nums.length; i++) {
        const currentDiff = nums[i + k - 1] - nums[i];
        if (currentDiff < minDiff) {
            minDiff = currentDiff;
        }
    }

    return minDiff;
};
