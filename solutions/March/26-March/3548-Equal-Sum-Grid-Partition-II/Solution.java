/**
 * Problem: LeetCode 3548 - Equal Sum Grid Partition II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.HashSet;

class Solution {
    public boolean canPartitionGrid(int[][] grid) {
        long totalSum = 0;
        for (int[] row : grid) {
            for (int val : row) {
                totalSum += val;
            }
        }

        return canPartition(grid, totalSum) ||
               canPartition(reverseRows(grid), totalSum) ||
               canPartition(transpose(grid), totalSum) ||
               canPartition(reverseRows(transpose(grid)), totalSum);
    }

    private boolean canPartition(int[][] grid, long totalSum) {
        int m = grid.length;
        int n = grid[0].length;
        long topSum = 0;
        HashSet<Long> seen = new HashSet<>();

        for (int i = 0; i < m - 1; i++) {
            for (int j = 0; j < n; j++) {
                seen.add((long) grid[i][j]);
                topSum += grid[i][j];
            }

            long botSum = totalSum - topSum;
            long diff = topSum - botSum;

            if (diff == 0) {
                return true;
            }

            if (diff > 0) {
                if (i == 0) {
                    // Top section has height 1: only end elements can be removed without disconnecting
                    if (n > 1) {
                        if (diff == grid[0][0] || diff == grid[0][n - 1]) {
                            return true;
                        }
                    }
                } else if (n == 1) {
                    // Top section has width 1: only top or bottom element can be removed
                    if (diff == grid[0][0] || diff == grid[i][0]) {
                        return true;
                    }
                } else {
                    // Top section has height >= 2 and width >= 2: any cell can be removed
                    if (seen.contains(diff)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private int[][] reverseRows(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] rev = new int[m][n];
        for (int i = 0; i < m; i++) {
            rev[i] = grid[m - 1 - i];
        }
        return rev;
    }

    private int[][] transpose(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] trans = new int[n][m];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                trans[j][i] = grid[i][j];
            }
        }
        return trans;
    }
}
