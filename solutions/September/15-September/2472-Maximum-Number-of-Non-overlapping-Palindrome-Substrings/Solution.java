/**
 * Problem: LeetCode 2472 - Maximum Number of Non-overlapping Palindrome Substrings
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxPalindromes(String s, int k) {
        int n = s.length();
        boolean[][] isPalin = new boolean[n][n];
        for (int i = 0; i < n; i++) isPalin[i][i] = true;
        for (int i = 0; i < n - 1; i++) {
            isPalin[i][i + 1] = (s.charAt(i) == s.charAt(i + 1));
        }
        for (int len = 3; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                isPalin[i][j] = (s.charAt(i) == s.charAt(j)) && isPalin[i + 1][j - 1];
            }
        }
        int count = 0;
        int i = 0;
        while (i <= n - k) {
            boolean found = false;
            for (int len = k; len <= k + 1 && i + len - 1 < n; len++) {
                int j = i + len - 1;
                if (isPalin[i][j]) {
                    count++;
                    i = j + 1;
                    found = true;
                    break;
                }
            }
            if (!found) i++;
        }
        return count;
    }
}
