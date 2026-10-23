/**
 * Problem: LeetCode 3043 - Find the Length of the Longest Common Prefix
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function(arr1, arr2) {
    const prefixes = new Set();

    // Store all prefix integers from arr1
    for (let val of arr1) {
        while (val > 0) {
            prefixes.add(val);
            val = Math.floor(val / 10);
        }
    }

    let maxLength = 0;

    // Search for longest common prefix in arr2
    for (let val of arr2) {
        while (val > 0) {
            if (prefixes.has(val)) {
                maxLength = Math.max(maxLength, String(val).length);
                break;
            }
            val = Math.floor(val / 10);
        }
    }

    return maxLength;
};
