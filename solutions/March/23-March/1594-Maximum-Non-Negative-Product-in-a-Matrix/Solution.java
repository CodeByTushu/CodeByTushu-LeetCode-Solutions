/**
 * Problem: LeetCode 1594 - Maximum Non Negative Product in a Matrix
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxProductPath(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        long[][] maxProd = new long[m][n];
        long[][] minProd = new long[m][n];

        maxProd[0][0] = grid[0][0];
        minProd[0][0] = grid[0][0];

        for (int j = 1; j < n; j++) {
            maxProd[0][j] = maxProd[0][j - 1] * grid[0][j];
            minProd[0][j] = minProd[0][j - 1] * grid[0][j];
        }

        for (int i = 1; i < m; i++) {
            maxProd[i][0] = maxProd[i - 1][0] * grid[i][0];
            minProd[i][0] = minProd[i - 1][0] * grid[i][0];
        }

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                long val = grid[i][j];
                long c1 = maxProd[i - 1][j] * val;
                long c2 = minProd[i - 1][j] * val;
                long c3 = maxProd[i][j - 1] * val;
                long c4 = minProd[i][j - 1] * val;

                maxProd[i][j] = Math.max(Math.max(c1, c2), Math.max(c3, c4));
                minProd[i][j] = Math.min(Math.min(c1, c2), Math.min(c3, c4));
            }
        }

        long ans = maxProd[m - 1][n - 1];
        if (ans < 0) {
            return -1;
        }

        long MOD = 1_000_000_007L;
        return (int) (ans % MOD);
    }
}
