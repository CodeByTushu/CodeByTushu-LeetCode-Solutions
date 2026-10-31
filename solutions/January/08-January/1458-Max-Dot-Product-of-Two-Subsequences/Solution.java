/**
 * Problem: LeetCode 1458 - Max Dot Product of Two Subsequences
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int maxDotProduct(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int m = nums2.length;
        int[][] dp = new int[n + 1][m + 1];

        // Initialize with a sufficiently small number that avoids integer underflow
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                dp[i][j] = -100_000_000;
            }
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                int prod = nums1[i - 1] * nums2[j - 1];
                int takeBoth = prod + Math.max(0, dp[i - 1][j - 1]);
                dp[i][j] = Math.max(takeBoth, Math.max(dp[i - 1][j], dp[i][j - 1]));
            }
        }

        return dp[n][m];
    }
}
