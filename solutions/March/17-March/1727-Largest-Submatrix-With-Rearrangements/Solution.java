/**
 * Problem: LeetCode 1727 - Largest Submatrix With Rearrangements
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int largestSubmatrix(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        int maxArea = 0;

        // Compute consecutive 1s height for each column
        for (int i = 1; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    matrix[i][j] += matrix[i - 1][j];
                }
            }
        }

        // For each row, sort heights and find max rectangular area
        for (int i = 0; i < m; i++) {
            int[] row = matrix[i].clone();
            Arrays.sort(row);

            for (int j = 0; j < n; j++) {
                int height = row[j];
                int width = n - j;
                maxArea = Math.max(maxArea, height * width);
            }
        }

        return maxArea;
    }
}
