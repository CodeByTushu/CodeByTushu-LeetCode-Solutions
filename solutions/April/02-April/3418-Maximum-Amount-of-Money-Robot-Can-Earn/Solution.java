/**
 * Problem: LeetCode 3418 - Maximum Amount of Money Robot Can Earn
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int maximumAmount(int[][] coins) {
        int m = coins.length;
        int n = coins[0].length;
        int NEG_INF = -1_000_000_000;

        // dp[i][j][k]: max profit at cell (i, j) with k neutralizations used (k in {0, 1, 2})
        int[][][] dp = new int[m][n][3];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                Arrays.fill(dp[i][j], NEG_INF);
            }
        }

        // Base case at (0, 0)
        dp[0][0][0] = coins[0][0];
        if (coins[0][0] < 0) {
            dp[0][0][1] = 0;
            dp[0][0][2] = 0;
        } else {
            dp[0][0][1] = coins[0][0];
            dp[0][0][2] = coins[0][0];
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;

                for (int k = 0; k < 3; k++) {
                    int maxVal = NEG_INF;

                    // Transition from cell above (i - 1, j)
                    if (i > 0) {
                        if (dp[i - 1][j][k] != NEG_INF) {
                            maxVal = Math.max(maxVal, dp[i - 1][j][k] + coins[i][j]);
                        }
                        if (k > 0 && coins[i][j] < 0 && dp[i - 1][j][k - 1] != NEG_INF) {
                            maxVal = Math.max(maxVal, dp[i - 1][j][k - 1]);
                        }
                    }

                    // Transition from cell to the left (i, j - 1)
                    if (j > 0) {
                        if (dp[i][j - 1][k] != NEG_INF) {
                            maxVal = Math.max(maxVal, dp[i][j - 1][k] + coins[i][j]);
                        }
                        if (k > 0 && coins[i][j] < 0 && dp[i][j - 1][k - 1] != NEG_INF) {
                            maxVal = Math.max(maxVal, dp[i][j - 1][k - 1]);
                        }
                    }

                    dp[i][j][k] = maxVal;
                }
            }
        }

        return Math.max(dp[m - 1][n - 1][0], Math.max(dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]));
    }
}
