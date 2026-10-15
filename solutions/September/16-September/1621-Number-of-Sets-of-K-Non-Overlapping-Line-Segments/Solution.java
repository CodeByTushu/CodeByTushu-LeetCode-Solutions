class Solution {
    public int numberOfSets(int n, int k) {
        long MOD = 1_000_000_007;
        int total = n + k - 1;
        int choose = 2 * k;
        return (int) combination(total, choose, MOD);
    }
    private long combination(int n, int r, long MOD) {
        if (r > n) return 0;
        long[][] dp = new long[n + 1][r + 1];
        for (int i = 0; i <= n; i++) dp[i][0] = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= Math.min(i, r); j++) {
                dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % MOD;
            }
        }
        return dp[n][r];
    }
}
