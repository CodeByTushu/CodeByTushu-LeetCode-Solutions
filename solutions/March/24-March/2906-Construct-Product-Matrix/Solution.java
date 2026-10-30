/**
 * Problem: 2906. Construct Product Matrix
 * Difficulty: Medium
 * Language: Java
 * 
 * Approach:
 * We need to compute the product of all elements except grid[i][j], modulo 12345.
 * Since 12345 is not prime (12345 = 3 * 5 * 823), modular inverse / division cannot be used.
 * Instead, we generalize the classic 1D "Product of Array Except Self" to 2D matrices:
 * 1. Forward Pass: Traverse the matrix in row-major order, setting p[i][j] to the running
 *    prefix product of all previously visited elements, then update the prefix product.
 * 2. Backward Pass: Traverse the matrix in reverse row-major order, multiplying p[i][j]
 *    by the running suffix product of all subsequent elements modulo 12345.
 * 
 * Time Complexity: O(n * m)
 * Space Complexity: O(1) auxiliary space (excluding the output matrix)
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
