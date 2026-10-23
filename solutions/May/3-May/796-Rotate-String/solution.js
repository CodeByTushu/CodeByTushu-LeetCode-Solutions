/**
 * Problem: LeetCode 796 - Rotate String
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function(s, goal) {
    return s.length === goal.length && (s + s).includes(goal);
};
