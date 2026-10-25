/**
 * Problem: LeetCode 1877 - Minimize Maximum Pair Sum in Array
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 * 
 * Greedy + Two Pointers Approach (Sorting)
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (or O(log n) for sorting)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minPairSum = function(nums) {
    nums.sort((a, b) => a - b);
    let maxPairSum = 0;
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const currentSum = nums[left] + nums[right];
        if (currentSum > maxPairSum) {
            maxPairSum = currentSum;
        }
        left++;
        right--;
    }

    return maxPairSum;
};
