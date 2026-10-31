/**
 * Problem: LeetCode 3212 - Count Submatrices With Equal Frequency of X and Y
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var numberOfSubmatrices = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const colX = new Int32Array(n);
    const colY = new Int32Array(n);
    let count = 0;

    for (let i = 0; i < m; i++) {
        let currentX = 0;
        let currentY = 0;
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 'X') {
                colX[j]++;
            } else if (grid[i][j] === 'Y') {
                colY[j]++;
            }
            currentX += colX[j];
            currentY += colY[j];

            if (currentX === currentY && currentX > 0) {
                count++;
            }
        }
    }

    return count;
};
