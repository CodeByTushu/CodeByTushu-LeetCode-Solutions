/**
 * Problem: LeetCode 1689 - Partitioning Into Minimum Number Of Deci-Binary Numbers
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} n
 * @return {number}
 */
var minPartitions = function(n) {
    let maxDigit = 0;
    for (let i = 0; i < n.length; i++) {
        const digit = n.charCodeAt(i) - 48;
        if (digit > maxDigit) {
            maxDigit = digit;
            if (maxDigit === 9) {
                return 9;
            }
        }
    }
    return maxDigit;
};
