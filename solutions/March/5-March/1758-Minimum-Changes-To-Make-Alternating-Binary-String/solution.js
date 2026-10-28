/**
 * Problem: LeetCode 1758 - Minimum Changes To Make Alternating Binary String
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function(s) {
    let diff0 = 0;
    const n = s.length;

    for (let i = 0; i < n; i++) {
        const expected = (i % 2 === 0) ? '0' : '1';
        if (s[i] !== expected) {
            diff0++;
        }
    }

    return Math.min(diff0, n - diff0);
};
