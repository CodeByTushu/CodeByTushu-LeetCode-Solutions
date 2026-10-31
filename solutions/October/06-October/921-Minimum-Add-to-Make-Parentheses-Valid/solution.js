/**
 * Problem: LeetCode 921 - Minimum Add to Make Parentheses Valid
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function(s) {
    let open = 0; // unmatched '('
    let add = 0;  // unmatched ')'
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            open++;
        } else {
            if (open > 0) {
                open--;
            } else {
                add++;
            }
        }
    }
    return add + open;
};
