/**
 * Problem: LeetCode 3742 - Maximum Path Score in a Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int maxPathScore(int[][] grid, int k) {
        int m = grid.length;
        int n = grid[0].length;
        int maxCost = Math.min(k, m + n - 1);

        int[][] dp = new int[n][maxCost + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        int cost0 = grid[0][0] == 0 ? 0 : 1;
        int score0 = grid[0][0];
        if (cost0 <= maxCost) {
            dp[0][cost0] = score0;
        } else {
            return -1;
        }

        // Initialize first row
        for (int c = 1; c < n; c++) {
            int cost = grid[0][c] == 0 ? 0 : 1;
            int score = grid[0][c];
            for (int w = cost; w <= maxCost; w++) {
                if (dp[c - 1][w - cost] != -1) {
                    dp[c][w] = dp[c - 1][w - cost] + score;
                }
            }
        }

        // Process subsequent rows
        for (int r = 1; r < m; r++) {
            int[][] nextDp = new int[n][maxCost + 1];
            for (int[] row : nextDp) {
                Arrays.fill(row, -1);
            }

            for (int c = 0; c < n; c++) {
                int cost = grid[r][c] == 0 ? 0 : 1;
                int score = grid[r][c];

                for (int w = cost; w <= maxCost; w++) {
                    int best = -1;
                    if (dp[c][w - cost] != -1) {
                        best = Math.max(best, dp[c][w - cost]);
                    }
                    if (c > 0 && nextDp[c - 1][w - cost] != -1) {
                        best = Math.max(best, nextDp[c - 1][w - cost]);
                    }
                    if (best != -1) {
                        nextDp[c][w] = best + score;
                    }
                }
            }
            dp = nextDp;
        }

        int maxScore = -1;
        for (int w = 0; w <= maxCost; w++) {
            maxScore = Math.max(maxScore, dp[n - 1][w]);
        }
        return maxScore;
    }
}
