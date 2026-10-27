/**
 * Problem: LeetCode 3963 - Create Grid With Exactly One Path
 * Difficulty: Easy
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {number} m
 * @param {number} n
 * @return {string[]}
 */
var createGrid = function(m, n) {
    const grid = [];
    for (let i = 0; i < m; i++) {
        let row = '';
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === n - 1) {
                row += '.';
            } else {
                row += '#';
            }
        }
        grid.push(row);
    }
    return grid;
};
