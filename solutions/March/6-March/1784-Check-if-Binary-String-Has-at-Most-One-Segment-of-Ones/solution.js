/**
 * Problem: LeetCode 1784 - Check if Binary String Has at Most One Segment of Ones
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function(s) {
    // Since s starts with '1' (no leading zeros),
    // a second segment of ones exists if and only if "01" appears in the string.
    return !s.includes("01");
};
