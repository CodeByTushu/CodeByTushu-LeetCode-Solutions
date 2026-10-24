/**
 * Problem: LeetCode 1895 - Largest Magic Square
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int largestMagicSquare(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;

        // rowSum[r][c + 1] stores the prefix sum of row r up to index c
        int[][] rowSum = new int[m][n + 1];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                rowSum[r][c + 1] = rowSum[r][c] + grid[r][c];
            }
        }

        // colSum[r + 1][c] stores the prefix sum of column c up to index r
        int[][] colSum = new int[m + 1][n];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                colSum[r + 1][c] = colSum[r][c] + grid[r][c];
            }
        }

        // Test square sizes from largest possible min(m, n) down to 2
        for (int k = Math.min(m, n); k >= 2; k--) {
            for (int r = 0; r <= m - k; r++) {
                for (int c = 0; c <= n - k; c++) {
                    if (isMagic(grid, rowSum, colSum, r, c, k)) {
                        return k;
                    }
                }
            }
        }

        return 1;
    }

    private boolean isMagic(int[][] grid, int[][] rowSum, int[][] colSum, int r, int c, int k) {
        int target = rowSum[r][c + k] - rowSum[r][c];

        // Check remaining row sums
        for (int i = 1; i < k; i++) {
            if (rowSum[r + i][c + k] - rowSum[r + i][c] != target) {
                return false;
            }
        }

        // Check all column sums
        for (int j = 0; j < k; j++) {
            if (colSum[r + k][c + j] - colSum[r][c + j] != target) {
                return false;
            }
        }

        // Check main diagonal sum
        int d1 = 0;
        for (int i = 0; i < k; i++) {
            d1 += grid[r + i][c + i];
        }
        if (d1 != target) {
            return false;
        }

        // Check anti-diagonal sum
        int d2 = 0;
        for (int i = 0; i < k; i++) {
            d2 += grid[r + i][c + k - 1 - i];
        }
        if (d2 != target) {
            return false;
        }

        return true;
    }
}
