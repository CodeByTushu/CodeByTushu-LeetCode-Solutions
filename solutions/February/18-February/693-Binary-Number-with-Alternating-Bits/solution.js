/**
 * Problem: LeetCode 693 - Binary Number with Alternating Bits
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
    const x = n ^ (n >> 1);
    return ((x + 1) & x) === 0;
};
