/**
 * Problem: LeetCode 2906 - Construct Product Matrix
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int[][] constructProductMatrix(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int[][] p = new int[n][m];
        int MOD = 12345;

        long prefix = 1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                p[i][j] = (int) prefix;
                prefix = (prefix * (grid[i][j] % MOD)) % MOD;
            }
        }

        long suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                p[i][j] = (int) ((p[i][j] * suffix) % MOD);
                suffix = (suffix * (grid[i][j] % MOD)) % MOD;
            }
        }

        return p;
    }
}
