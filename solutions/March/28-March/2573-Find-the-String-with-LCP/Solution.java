/**
 * Problem: LeetCode 2573 - Find the String with LCP
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String findTheString(int[][] lcp) {
        int n = lcp.length;
        char[] word = new char[n];
        char curChar = 'a';

        for (int i = 0; i < n; i++) {
            if (word[i] == 0) {
                if (curChar > 'z') {
                    return "";
                }
                char ch = curChar++;
                for (int j = i; j < n; j++) {
                    if (lcp[i][j] > 0) {
                        word[j] = ch;
                    }
                }
            }
        }

        // Validate that word produces the exact LCP matrix
        for (int i = n - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int expected = (word[i] == word[j])
                    ? (1 + (i + 1 < n && j + 1 < n ? lcp[i + 1][j + 1] : 0))
                    : 0;
                if (lcp[i][j] != expected) {
                    return "";
                }
            }
        }

        return new String(word);
    }
}
