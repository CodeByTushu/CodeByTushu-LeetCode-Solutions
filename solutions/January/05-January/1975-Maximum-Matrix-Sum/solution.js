/**
 * Problem: LeetCode 1975 - Maximum Matrix Sum
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxMatrixSum = function(matrix) {
    let totalSum = 0;
    let minAbs = Infinity;
    let negCount = 0;

    for (const row of matrix) {
        for (const val of row) {
            if (val < 0) {
                negCount++;
            }
            const absVal = Math.abs(val);
            totalSum += absVal;
            if (absVal < minAbs) {
                minAbs = absVal;
            }
        }
    }

    if (negCount % 2 === 0) {
        return totalSum;
    }
    return totalSum - 2 * minAbs;
};
