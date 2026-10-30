/**
 * Problem: 3548. Equal Sum Grid Partition II
 * Difficulty: Hard
 * Language: Java
 * 
 * Approach:
 * We need to determine if a single horizontal or vertical cut can partition the grid
 * into two non-empty sections whose sums are equal or can be made equal by discounting
 * at most one single cell, such that the discounted section remains connected.
 * 
 * Key Observations:
 * 1. An R x C section with R >= 2 and C >= 2 is 2-connected (biconnected). Removing ANY
 *    single cell from such a section leaves it connected.
 * 2. If R == 1 and C > 1, the section is a single row. Removing an interior cell disconnects it;
 *    only the endpoints (first or last cell) can be discounted.
 * 3. If C == 1 and R > 1, the section is a single column. Only the endpoints (first or last cell)
 *    can be discounted.
 * 4. We can check horizontal cuts where the discount (if any) is taken from the top section.
 *    By transforming the grid (original, reversed rows, transposed, and reversed transposed),
 *    we cover all 4 possibilities:
 *    - Horizontal cut, discount from top
 *    - Horizontal cut, discount from bottom (reversed rows)
 *    - Vertical cut, discount from left (transposed)
 *    - Vertical cut, discount from right (reversed transposed)
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
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
