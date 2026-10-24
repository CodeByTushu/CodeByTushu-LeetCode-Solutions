/**
 * Problem: LeetCode 1895 - Largest Magic Square
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestMagicSquare = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // Row prefix sums
    const rowSum = Array.from({ length: m }, () => new Int32Array(n + 1));
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            rowSum[r][c + 1] = rowSum[r][c] + grid[r][c];
        }
    }

    // Col prefix sums
    const colSum = Array.from({ length: m + 1 }, () => new Int32Array(n));
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            colSum[r + 1][c] = colSum[r][c] + grid[r][c];
        }
    }

    function isMagic(r, c, k) {
        const target = rowSum[r][c + k] - rowSum[r][c];

        // Check rows
        for (let i = 1; i < k; i++) {
            if (rowSum[r + i][c + k] - rowSum[r + i][c] !== target) return false;
        }

        // Check columns
        for (let j = 0; j < k; j++) {
            if (colSum[r + k][c + j] - colSum[r][c + j] !== target) return false;
        }

        // Check main diagonal
        let d1 = 0;
        for (let i = 0; i < k; i++) {
            d1 += grid[r + i][c + i];
        }
        if (d1 !== target) return false;

        // Check anti-diagonal
        let d2 = 0;
        for (let i = 0; i < k; i++) {
            d2 += grid[r + i][c + k - 1 - i];
        }
        if (d2 !== target) return false;

        return true;
    }

    for (let k = Math.min(m, n); k >= 2; k--) {
        for (let r = 0; r <= m - k; r++) {
            for (let c = 0; c <= n - k; c++) {
                if (isMagic(r, c, k)) {
                    return k;
                }
            }
        }
    }

    return 1;
};
