/**
 * Problem: LeetCode 3498 - Reverse Degree of a String
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function(s) {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        const reversedAlphabetPos = 26 - (s.charCodeAt(i) - 97);
        const stringPos = i + 1;
        result += reversedAlphabetPos * stringPos;
    }
    return result;
};
