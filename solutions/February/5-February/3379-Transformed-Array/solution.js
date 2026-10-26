/**
 * Problem: LeetCode 3379 - Transformed Array
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var constructTransformedArray = function(nums) {
    const n = nums.length;
    const result = new Array(n);

    for (let i = 0; i < n; i++) {
        // Normalize JavaScript negative remainder via ((val % n) + n) % n
        const targetIndex = ((i + nums[i]) % n + n) % n;
        result[i] = nums[targetIndex];
    }

    return result;
};
