/**
 * Problem: LeetCode 3567 - Minimum Absolute Difference in Sliding Submatrix
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int[][] minAbsDiff(int[][] grid, int k) {
        int m = grid.length;
        int n = grid[0].length;
        int rows = m - k + 1;
        int cols = n - k + 1;
        int[][] ans = new int[rows][cols];
        int[] window = new int[k * k];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int idx = 0;
                for (int r = 0; r < k; r++) {
                    for (int c = 0; c < k; c++) {
                        window[idx++] = grid[i + r][j + c];
                    }
                }

                Arrays.sort(window);
                int minDiff = Integer.MAX_VALUE;

                for (int p = 1; p < window.length; p++) {
                    if (window[p] != window[p - 1]) {
                        int diff = window[p] - window[p - 1];
                        if (diff < minDiff) {
                            minDiff = diff;
                        }
                    }
                }

                ans[i][j] = (minDiff == Integer.MAX_VALUE) ? 0 : minDiff;
            }
        }

        return ans;
    }
}
