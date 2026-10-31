/**
 * Problem: LeetCode 1861 - Rotating the Box
 * Difficulty: Medium
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {character[][]} boxGrid
 * @return {character[][]}
 */
var rotateTheBox = function(boxGrid) {
    const m = boxGrid.length;
    const n = boxGrid[0].length;

    // Step 1: Simulate gravity row by row (falling to the right)
    for (let i = 0; i < m; i++) {
        let emptySlot = n - 1;
        for (let j = n - 1; j >= 0; j--) {
            if (boxGrid[i][j] === '*') {
                emptySlot = j - 1;
            } else if (boxGrid[i][j] === '#') {
                boxGrid[i][j] = '.';
                boxGrid[i][emptySlot] = '#';
                emptySlot--;
            }
        }
    }

    // Step 2: Rotate 90 degrees clockwise into an n x m matrix
    const res = Array.from({ length: n }, () => new Array(m));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res[j][m - 1 - i] = boxGrid[i][j];
        }
    }

    return res;
};
