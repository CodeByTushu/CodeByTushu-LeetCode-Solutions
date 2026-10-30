/**
 * Problem: 1594. Maximum Non Negative Product in a Matrix
 * Difficulty: Medium
 * Language: Java
 * 
 * Approach:
 * At any cell (i, j), multiplying by a negative number can flip a minimum product
 * to a maximum product and vice-versa. Therefore, we use Dynamic Programming to track
 * both the maximum and minimum products to reach cell (i, j) from (0, 0).
 * 
 * For each cell (i, j), we consider transitions from (i - 1, j) and (i, j - 1),
 * computing all 4 possible products with grid[i][j], and taking the maximum and minimum.
 * Products can reach up to 4^29, which comfortably fits in a 64-bit signed long.
 * Finally, if the maximum product at (m - 1, n - 1) is negative, we return -1;
 * otherwise, we return maxProd[m - 1][n - 1] % (10^9 + 7).
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) auxiliary space
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
