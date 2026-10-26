/**
 * Problem: LeetCode 1404 - Number of Steps to Reduce a Number in Binary Representation to One
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var numSteps = function(s) {
    let steps = 0;
    let carry = 0;

    for (let i = s.length - 1; i > 0; i--) {
        const bit = (s.charCodeAt(i) - 48) + carry;
        if (bit % 2 === 1) {
            steps += 2;
            carry = 1;
        } else {
            steps += 1;
        }
    }

    return steps + carry;
};
