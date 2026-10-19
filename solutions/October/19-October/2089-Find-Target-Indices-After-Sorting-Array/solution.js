/**
 * Problem: LeetCode 2089 - Find Target Indices After Sorting Array
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var targetIndices = function(nums, target) {
    let less = 0;
    let equal = 0;
    for (const x of nums) {
        if (x < target) {
            less++;
        } else if (x === target) {
            equal++;
        }
    }
    const result = [];
    for (let i = 0; i < equal; i++) {
        result.push(less + i);
    }
    return result;
};
