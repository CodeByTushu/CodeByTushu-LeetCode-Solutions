/**
 * Problem: LeetCode 1888 - Minimum Number of Flips to Make the Binary String Alternating
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minFlips(String s) {
        int n = s.length();
        int diff1 = 0; // Mismatches with alternating pattern starting with '0'
        int diff2 = 0; // Mismatches with alternating pattern starting with '1'
        int minFlips = n;

        // Simulate sliding window of length n over virtual doubled string (s + s)
        for (int i = 0; i < 2 * n; i++) {
            char curr = s.charAt(i % n);
            char target1 = (i % 2 == 0) ? '0' : '1';
            char target2 = (i % 2 == 0) ? '1' : '0';

            if (curr != target1) diff1++;
            if (curr != target2) diff2++;

            // Shrink window if it exceeds length n
            if (i >= n) {
                char out = s.charAt((i - n) % n);
                char outTarget1 = ((i - n) % 2 == 0) ? '0' : '1';
                char outTarget2 = ((i - n) % 2 == 0) ? '1' : '0';

                if (out != outTarget1) diff1--;
                if (out != outTarget2) diff2--;
            }

            // Once window reaches size n, record the minimum flips
            if (i >= n - 1) {
                minFlips = Math.min(minFlips, Math.min(diff1, diff2));
            }
        }

        return minFlips;
    }
}
