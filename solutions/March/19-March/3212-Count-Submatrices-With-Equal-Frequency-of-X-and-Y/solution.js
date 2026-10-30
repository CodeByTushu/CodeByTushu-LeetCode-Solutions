/**
 * Problem: 3212. Count Submatrices With Equal Frequency of X and Y
 * Difficulty: Medium
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Every submatrix containing grid[0][0] is uniquely determined by its bottom-right cell (i, j).
 * We maintain column prefix frequencies for 'X' and 'Y' in Int32Arrays of length n.
 * For each row, sweeping horizontally allows row-wise prefix accumulation of column frequencies,
 * determining the exact count of 'X' and 'Y' in submatrix (0, 0) to (i, j).
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(n) auxiliary space
 * 
 * @param {character[][]} grid
 * @return {number}
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
