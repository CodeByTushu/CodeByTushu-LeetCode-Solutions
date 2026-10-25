/**
 * Problem: LeetCode 3651 - Minimum Cost Path with Teleportations
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 * 
 * Dynamic Programming + Suffix Minimum Optimization
 * Time Complexity: O(k * (m * n + maxVal))
 * Space Complexity: O(m * n + maxVal)
 */

import java.util.Arrays;

class Solution {
    public int minCost(int[][] grid, int k) {
        int m = grid.length;
        int n = grid[0].length;

        int maxVal = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] > maxVal) {
                    maxVal = grid[r][c];
                }
            }
        }

        final int INF = 1_000_000_000;
        int[][] dp = new int[m][n];
        for (int r = 0; r < m; r++) {
            Arrays.fill(dp[r], INF);
        }

        // Base case: starting at (0, 0) costs 0
        dp[0][0] = 0;

        // Base layer (0 teleportations): normal moves only
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (r > 0 && dp[r - 1][c] != INF) {
                    dp[r][c] = Math.min(dp[r][c], dp[r - 1][c] + grid[r][c]);
                }
                if (c > 0 && dp[r][c - 1] != INF) {
                    dp[r][c] = Math.min(dp[r][c], dp[r][c - 1] + grid[r][c]);
                }
            }
        }

        // Up to k teleportations
        int[] minAtVal = new int[maxVal + 1];
        int[] suffMin = new int[maxVal + 1];

        for (int t = 0; t < k; t++) {
            Arrays.fill(minAtVal, INF);

            // Record minimum cost reachable at each cell value
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    int val = grid[r][c];
                    if (dp[r][c] < minAtVal[val]) {
                        minAtVal[val] = dp[r][c];
                    }
                }
            }

            // suffMin[v] = min cost to reach any cell with value >= v
            int curMin = INF;
            for (int v = maxVal; v >= 0; v--) {
                if (minAtVal[v] < curMin) {
                    curMin = minAtVal[v];
                }
                suffMin[v] = curMin;
            }

            int[][] nextDp = new int[m][n];

            // Teleportation step (cost 0): to cell (r, c), we can teleport from any cell with value >= grid[r][c]
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    nextDp[r][c] = Math.min(dp[r][c], suffMin[grid[r][c]]);
                }
            }

            // Normal moves step after teleportation
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    if (r > 0 && nextDp[r - 1][c] != INF) {
                        nextDp[r][c] = Math.min(nextDp[r][c], nextDp[r - 1][c] + grid[r][c]);
                    }
                    if (c > 0 && nextDp[r][c - 1] != INF) {
                        nextDp[r][c] = Math.min(nextDp[r][c], nextDp[r][c - 1] + grid[r][c]);
                    }
                }
            }

            dp = nextDp;
        }

        return dp[m - 1][n - 1];
    }
}
