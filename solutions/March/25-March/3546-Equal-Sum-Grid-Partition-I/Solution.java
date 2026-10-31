/**
 * Problem: LeetCode 3546 - Equal Sum Grid Partition I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean canPartitionGrid(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        long totalSum = 0;
        long[] rowSums = new long[m];
        long[] colSums = new long[n];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                long val = grid[i][j];
                totalSum += val;
                rowSums[i] += val;
                colSums[j] += val;
            }
        }

        if (totalSum % 2 != 0) {
            return false;
        }

        long target = totalSum / 2;

        long runningRow = 0;
        for (int i = 0; i < m - 1; i++) {
            runningRow += rowSums[i];
            if (runningRow == target) {
                return true;
            }
        }

        long runningCol = 0;
        for (int j = 0; j < n - 1; j++) {
            runningCol += colSums[j];
            if (runningCol == target) {
                return true;
            }
        }

        return false;
    }
}
