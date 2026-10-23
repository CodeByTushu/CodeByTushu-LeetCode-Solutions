/**
 * Problem: LeetCode 1614 - Maximum Nesting Depth of the Parentheses
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {number}
 */
var maxDepth = function(s) {
    let depth = 0;
    let maxDepth = 0;

    for (const c of s) {
        if (c === '(') {
            depth++;
            maxDepth = Math.max(maxDepth, depth);
        } else if (c === ')') {
            depth--;
        }
    }

    return maxDepth;
};
