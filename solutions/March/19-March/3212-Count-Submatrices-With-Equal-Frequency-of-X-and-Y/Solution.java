/**
 * Problem: LeetCode 3212 - Count Submatrices With Equal Frequency of X and Y
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
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
