/**
 * Problem: LeetCode 2913 - Subarrays Distinct Element Sum of Squares I
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function(nums) {
    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        const distinct = new Set();
        for (let j = i; j < n; j++) {
            distinct.add(nums[j]);
            const count = distinct.size;
            total += count * count;
        }
    }
    return total;
};
