import java.util.*;

class Solution {

    private static final int MOD = 1_000_000_007;
    private static final int MAX = 200;

    public int subsequencePairCount(int[] nums) {

        long[][] dp = new long[MAX + 1][MAX + 1];
        dp[0][0] = 1;

        for (int num : nums) {

            long[][] next = new long[MAX + 1][MAX + 1];

            for (int g1 = 0; g1 <= MAX; g1++) {
                for (int g2 = 0; g2 <= MAX; g2++) {

                    if (dp[g1][g2] == 0) continue;

                    // Ignore current number
                    next[g1][g2] = (next[g1][g2] + dp[g1][g2]) % MOD;

                    // Put in first subsequence
                    int ng1 = (g1 == 0) ? num : gcd(g1, num);
                    next[ng1][g2] = (next[ng1][g2] + dp[g1][g2]) % MOD;

                    // Put in second subsequence
                    int ng2 = (g2 == 0) ? num : gcd(g2, num);
                    next[g1][ng2] = (next[g1][ng2] + dp[g1][g2]) % MOD;
                }
            }

            dp = next;
        }

        long ans = 0;

        for (int g = 1; g <= MAX; g++) {
            ans = (ans + dp[g][g]) % MOD;
        }

        return (int) ans;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
