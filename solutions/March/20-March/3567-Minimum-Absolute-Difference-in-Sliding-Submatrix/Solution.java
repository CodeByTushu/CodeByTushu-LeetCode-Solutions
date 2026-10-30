/**
 * Problem: 3567. Minimum Absolute Difference in Sliding Submatrix
 * Difficulty: Medium
 * Language: Java
 * 
 * Approach:
 * For each contiguous k x k submatrix starting at top-left corner (i, j),
 * we extract all k * k elements into an array.
 * We sort the array in ascending order to bring values with minimal differences adjacent to each other.
 * We then iterate through adjacent elements: whenever two adjacent values are distinct,
 * we compute their difference and update the minimum difference.
 * If all elements in the submatrix are identical (or no two distinct values exist), the result is 0.
 * 
 * Time Complexity: O((m - k + 1) * (n - k + 1) * k^2 * log(k))
 * Space Complexity: O(k^2) auxiliary space for collecting window elements
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
