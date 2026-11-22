/**
 * Problem: LeetCode 2124 - Check if All A's Appears Before All B's
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var checkString = function(s) {
    // Agar "ba" substring present nahi hai toh return true
    return !s.includes("ba");
};
