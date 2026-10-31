/**
 * Problem: LeetCode 3643 - Flip Square Submatrix Vertically
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int[][] flipSubmatrix(int[][] grid, int x, int y, int k) {
        int top = x;
        int bottom = x + k - 1;

        while (top < bottom) {
            for (int j = y; j < y + k; j++) {
                int temp = grid[top][j];
                grid[top][j] = grid[bottom][j];
                grid[bottom][j] = temp;
            }
            top++;
            bottom--;
        }

        return grid;
    }
}
