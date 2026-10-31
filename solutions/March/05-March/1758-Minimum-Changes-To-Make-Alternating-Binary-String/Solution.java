/**
 * Problem: LeetCode 1758 - Minimum Changes To Make Alternating Binary String
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minOperations(String s) {
        int diff0 = 0;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            // Pattern 1: index 0 is '0', index 1 is '1', index 2 is '0', etc.
            char expected = (i % 2 == 0) ? '0' : '1';
            if (s.charAt(i) != expected) {
                diff0++;
            }
        }

        // Pattern 2 is the exact complement of Pattern 1 at every index,
        // so operations for Pattern 2 = n - diff0.
        return Math.min(diff0, n - diff0);
    }
}
