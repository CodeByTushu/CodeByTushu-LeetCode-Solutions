/**
 * Problem: 3546. Equal Sum Grid Partition I
 * Difficulty: Medium
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Accumulate total sum, row sums, and column sums.
 * Check whether any prefix row sum (up to m - 2) or prefix column sum (up to n - 2)
 * equals totalSum / 2.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m + n) auxiliary space
 * 
 * @param {number[][]} grid
 * @return {boolean}
 */
var canPartitionGrid = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let totalSum = 0;
    const rowSums = new Float64Array(m);
    const colSums = new Float64Array(n);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const val = grid[i][j];
            totalSum += val;
            rowSums[i] += val;
            colSums[j] += val;
        }
    }

    if (totalSum % 2 !== 0) {
        return false;
    }

    const target = totalSum / 2;

    let runningRow = 0;
    for (let i = 0; i < m - 1; i++) {
        runningRow += rowSums[i];
        if (runningRow === target) {
            return true;
        }
    }

    let runningCol = 0;
    for (let j = 0; j < n - 1; j++) {
        runningCol += colSums[j];
        if (runningCol === target) {
            return true;
        }
    }

    return false;
};
