/**
 * Problem: 3212. Count Submatrices With Equal Frequency of X and Y
 * Difficulty: Medium
 * Language: Java
 * 
 * Approach:
 * Any submatrix that contains grid[0][0] has its top-left corner fixed at (0, 0)
 * and its bottom-right corner at some cell (i, j).
 * We maintain running column prefix sums for 'X' and 'Y' across rows.
 * For each cell (i, j), we aggregate the column counts across the row from 0 to j.
 * This yields the exact frequency of 'X' and 'Y' in the submatrix bounded by (0, 0) and (i, j)
 * in O(1) time per cell with O(n) auxiliary space.
 * If countX == countY and countX > 0, we increment our valid submatrix count.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(n) auxiliary space
 */
class Solution {
    public int numberOfSubmatrices(char[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[] colX = new int[n];
        int[] colY = new int[n];
        int count = 0;

        for (int i = 0; i < m; i++) {
            int currentX = 0;
            int currentY = 0;
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 'X') {
                    colX[j]++;
                } else if (grid[i][j] == 'Y') {
                    colY[j]++;
                }
                currentX += colX[j];
                currentY += colY[j];

                if (currentX == currentY && currentX > 0) {
                    count++;
                }
            }
        }

        return count;
    }
}
