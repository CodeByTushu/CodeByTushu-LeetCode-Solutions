/**
 * Problem: LeetCode 3666 - Minimum Operations to Equalize Binary String
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minOperations(String s, int k) {
        int n = s.length();
        int c0 = 0;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '0') {
                c0++;
            }
        }

        if (c0 == 0) {
            return 0;
        }

        int c1 = n - c0;
        int best = Integer.MAX_VALUE;

        // Case 1: Odd number of operations m
        // For odd m, m * k has the same parity as k, so k % 2 must equal c0 % 2.
        if (k % 2 == c0 % 2) {
            int minM = (c0 + k - 1) / k;
            if (n == k) {
                if (c1 == 0) {
                    if (minM % 2 == 0) minM++;
                    best = Math.min(best, minM);
                }
            } else {
                minM = Math.max(minM, (c1 + (n - k) - 1) / (n - k));
                if (minM % 2 == 0) minM++;
                best = Math.min(best, minM);
            }
        }

        // Case 2: Even number of operations m
        // For even m, m * k is always even, so c0 must be even.
        if (c0 % 2 == 0) {
            int minM = Math.max(2, (c0 + k - 1) / k);
            if (n > k) {
                minM = Math.max(minM, (c0 + (n - k) - 1) / (n - k));
                if (minM % 2 != 0) minM++;
                best = Math.min(best, minM);
            }
        }

        return best == Integer.MAX_VALUE ? -1 : best;
    }
}
