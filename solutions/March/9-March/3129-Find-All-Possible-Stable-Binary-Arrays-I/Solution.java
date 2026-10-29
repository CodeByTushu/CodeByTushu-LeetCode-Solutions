/**
 * Problem: LeetCode 3129 - Find All Possible Stable Binary Arrays I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int numberOfStableArrays(int zero, int one, int limit) {
        final int MOD = 1_000_000_007;

        // dp0[i][j] = valid arrays with i zeros and j ones ending in 0
        // dp1[i][j] = valid arrays with i zeros and j ones ending in 1
        long[][] dp0 = new long[zero + 1][one + 1];
        long[][] dp1 = new long[zero + 1][one + 1];

        // Base cases: purely zeros or purely ones
        for (int i = 1; i <= Math.min(zero, limit); i++) {
            dp0[i][0] = 1;
        }
        for (int j = 1; j <= Math.min(one, limit); j++) {
            dp1[0][j] = 1;
        }

        // DP state transitions
        for (int i = 1; i <= zero; i++) {
            for (int j = 1; j <= one; j++) {
                // Ending in 0: append '0' to any valid prefix (i-1, j)
                dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
                if (i > limit) {
                    // Subtract invalid configurations exceeding 'limit' consecutive zeros
                    dp0[i][j] = (dp0[i][j] - dp1[i - 1 - limit][j] + MOD) % MOD;
                }

                // Ending in 1: append '1' to any valid prefix (i, j-1)
                dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
                if (j > limit) {
                    // Subtract invalid configurations exceeding 'limit' consecutive ones
                    dp1[i][j] = (dp1[i][j] - dp0[i][j - 1 - limit] + MOD) % MOD;
                }
            }
        }

        return (int) ((dp0[zero][one] + dp1[zero][one]) % MOD);
    }
}
