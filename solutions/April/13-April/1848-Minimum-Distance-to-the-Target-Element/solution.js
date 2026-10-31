/**
 * Problem: LeetCode 1848 - Minimum Distance to the Target Element
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function(nums, target, start) {
    let minDistance = Infinity;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            minDistance = Math.min(minDistance, Math.abs(i - start));
            if (minDistance === 0) return 0;
        }
    }
    return minDistance;
};
