/**
 * Problem: LeetCode 940 - Distinct Subsequences II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int distinctSubseqII(String s) {
        long MOD = 1_000_000_007;
        long[] dp = new long[26];
        for (char ch : s.toCharArray()) {
            int c = ch - 'a';
            long total = 1;
            for (int i = 0; i < 26; i++) {
                total = (total + dp[i]) % MOD;
            }
            dp[c] = total;
        }
        long ans = 0;
        for (int i = 0; i < 26; i++) {
            ans = (ans + dp[i]) % MOD;
        }
        return (int) ans;
    }
}
