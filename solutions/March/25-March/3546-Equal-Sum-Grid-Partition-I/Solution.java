/**
 * Problem: 3546. Equal Sum Grid Partition I
 * Difficulty: Medium
 * Language: Java
 * 
 * Approach:
 * We need to determine if a single horizontal cut or a single vertical cut can partition
 * the grid into two non-empty sections of equal sum.
 * 
 * 1. Calculate the total sum of all elements in the grid as a 64-bit long.
 *    If the total sum is odd, an equal integer partition is impossible, so return false.
 * 2. Calculate the target sum: target = totalSum / 2.
 * 3. Check Horizontal Cuts:
 *    Accumulate row sums from row 0 to m - 2. If the running prefix sum equals target, return true.
 * 4. Check Vertical Cuts:
 *    Accumulate column sums from column 0 to n - 2. If the running prefix sum equals target, return true.
 * 5. If no valid cut exists, return false.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m + n) auxiliary space
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
