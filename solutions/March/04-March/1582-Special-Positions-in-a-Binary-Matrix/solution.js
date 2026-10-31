/**
 * Problem: LeetCode 1582 - Special Positions in a Binary Matrix
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSpecial = function(mat) {
    const m = mat.length;
    const n = mat[0].length;
    const rowSum = new Array(m).fill(0);
    const colSum = new Array(n).fill(0);

    // Step 1: Precompute frequency of 1s in each row and column
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 1) {
                rowSum[i]++;
                colSum[j]++;
            }
        }
    }

    // Step 2: Count cells that uniquely hold the single 1 in both their row and column
    let specialCount = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 1 && rowSum[i] === 1 && colSum[j] === 1) {
                specialCount++;
            }
        }
    }

    return specialCount;
};
