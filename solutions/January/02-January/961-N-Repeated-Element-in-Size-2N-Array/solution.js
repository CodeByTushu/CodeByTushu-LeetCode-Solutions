/**
 * Problem: LeetCode 961 - N-Repeated Element in Size 2N Array
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var repeatedNTimes = function(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    return -1;
};
