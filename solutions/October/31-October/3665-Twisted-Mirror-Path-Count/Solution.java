import java.util.*;

/**
 * Problem: LeetCode 3665 - Twisted Mirror Path Count
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int uniquePaths(int[][] grid) {
        final int MOD = 1_000_000_007;
        int m = grid.length, n = grid[0].length;

        // f[i][j][0] = attempt to enter (i, j) moving right
        // f[i][j][1] = attempt to enter (i, j) moving down
        int[][][] f = new int[m + 1][n + 1][2];
        f[0][0][0] = 1; // start cell is empty, so it just lands

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int fromRight = f[i][j][0];
                int fromDown = f[i][j][1];

                if (grid[i][j] == 0) {
                    int total = (fromRight + fromDown) % MOD;
                    // move right
                    f[i][j + 1][0] = (f[i][j + 1][0] + total) % MOD;
                    // move down
                    f[i + 1][j][1] = (f[i + 1][j][1] + total) % MOD;
                } else {
                    // entered mirror moving right -> turned down, attempt (i+1, j) moving down
                    f[i + 1][j][1] = (f[i + 1][j][1] + fromRight) % MOD;
                    // entered mirror moving down -> turned right, attempt (i, j+1) moving right
                    f[i][j + 1][0] = (f[i][j + 1][0] + fromDown) % MOD;
                }
            }
        }

        return (f[m - 1][n - 1][0] + f[m - 1][n - 1][1]) % MOD;
    }
}
