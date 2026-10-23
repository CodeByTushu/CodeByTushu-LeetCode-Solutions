/**
 * Problem: LeetCode 3718 - Smallest Missing Multiple of K
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingMultiple = function(nums, k) {
    const set = new Set(nums);

    let multiple = k;
    while (set.has(multiple)) {
        multiple += k;
    }

    return multiple;
};
