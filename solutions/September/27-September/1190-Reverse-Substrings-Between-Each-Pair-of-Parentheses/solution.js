/**
 * Problem: LeetCode 1190 - Reverse Substrings Between Each Pair of Parentheses
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    const stack = [];
    let current = [];

    for (const c of s) {
        if (c === '(') {
            stack.push(current);
            current = [];
        } else if (c === ')') {
            current.reverse();
            current = stack.pop().concat(current);
        } else {
            current.push(c);
        }
    }

    return current.join('');
};
