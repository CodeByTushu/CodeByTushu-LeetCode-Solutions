/**
 * Problem: LeetCode 1680 - Concatenation of Consecutive Binary Numbers
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int concatenatedBinary(int n) {
        long ans = 0;
        int bitLength = 0;
        final long MOD = 1_000_000_007L;

        for (int i = 1; i <= n; i++) {
            // When i is a power of 2, its binary representation requires one more bit
            if ((i & (i - 1)) == 0) {
                bitLength++;
            }
            ans = ((ans << bitLength) | i) % MOD;
        }

        return (int) ans;
    }
}
