/**
 * Problem: LeetCode 678 - Valid Parenthesis String
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
    let lo = 0;
    let hi = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '(') {
            lo++;
            hi++;
        } else if (c === ')') {
            lo--;
            hi--;
        } else { // '*'
            lo--;
            hi++;
        }
        if (hi < 0) return false;
        if (lo < 0) lo = 0;
    }
    return lo === 0;
};
