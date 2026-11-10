/**
 * Problem: LeetCode 3693 - Climbing Stairs II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int climbStairs(int n, int[] costs) {
        int[] dp = new int[n + 1];
        dp[0] = 0; // Base case: start at step 0 with cost 0

        for (int j = 1; j <= n; j++) {
            int best = Integer.MAX_VALUE;

            // Jump from j-1, j-2, or j-3 (only if valid step >= 0)
            for (int d = 1; d <= 3 && j - d >= 0; d++) {
                best = Math.min(best, dp[j - d] + costs[j - 1] + d * d);
            }

            dp[j] = best;
        }

        return dp[n];
    }
}
