/**
 * Problem: 2573. Find the String with LCP
 * Difficulty: Hard
 * Language: Java
 * 
 * Approach:
 * We are given an n x n LCP matrix and need to reconstruct the lexicographically
 * smallest string of length n that produces this exact matrix, or return "" if invalid.
 * 
 * 1. Greedy Reconstruction:
 *    - An entry lcp[i][j] > 0 implies word[i] == word[j].
 *    - To achieve the lexicographically smallest string, we greedily assign characters
 *      starting from 'a', 'b', ..., 'z' from index 0 to n - 1.
 *    - When we encounter an unassigned index i, we assign the next available character
 *      to i and all j >= i where lcp[i][j] > 0.
 *    - If we need more than 26 distinct characters, return "" immediately.
 * 
 * 2. Verification via Dynamic Programming:
 *    - The reconstructed word might not actually satisfy the given lcp matrix (due to
 *      transitivity violations, out-of-bound lengths, or invalid symmetries).
 *    - We compute the actual LCP matrix of word using the recurrence:
 *      expected = (word[i] == word[j]) ? (1 + (i + 1 < n && j + 1 < n ? lcp[i + 1][j + 1] : 0)) : 0
 *    - If at any cell lcp[i][j] != expected, the input matrix is invalid, return "".
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(n) auxiliary space (excluding returned string)
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
