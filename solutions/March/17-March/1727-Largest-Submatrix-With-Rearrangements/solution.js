/**
 * Problem: LeetCode 1727 - Largest Submatrix With Rearrangements
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var largestSubmatrix = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let maxArea = 0;

    // Compute consecutive 1s height for each column
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                matrix[i][j] += matrix[i - 1][j];
            }
        }
    }

    // For each row, sort heights and find max rectangular area
    for (let i = 0; i < m; i++) {
        const row = matrix[i].slice().sort((a, b) => a - b);
        for (let j = 0; j < n; j++) {
            const height = row[j];
            const width = n - j;
            maxArea = Math.max(maxArea, height * width);
        }
    }

    return maxArea;
};
