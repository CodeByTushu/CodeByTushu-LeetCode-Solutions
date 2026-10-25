/**
 * Problem: LeetCode 1292 - Maximum Side Length of a Square with Sum Less than or Equal to Threshold
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 * 
 * Optimized 2D Prefix Sum + Greedy Window Expansion Approach
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */

class Solution {
    public int maxSideLength(int[][] mat, int threshold) {
        int m = mat.length;
        int n = mat[0].length;
        int[][] pref = new int[m + 1][n + 1];

        // Precompute 2D prefix sums
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                pref[i + 1][j + 1] = mat[i][j] + pref[i][j + 1] + pref[i + 1][j] - pref[i][j];
            }
        }

        int maxLen = 0;

        // Greedily expand side length at each candidate bottom-right corner (i, j)
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (i > maxLen && j > maxLen) {
                    int k = maxLen + 1;
                    int sum = pref[i][j] - pref[i - k][j] - pref[i][j - k] + pref[i - k][j - k];
                    if (sum <= threshold) {
                        maxLen++;
                    }
                }
            }
        }

        return maxLen;
    }
}
