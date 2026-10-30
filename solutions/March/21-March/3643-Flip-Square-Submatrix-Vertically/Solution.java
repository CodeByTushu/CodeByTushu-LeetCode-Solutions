/**
 * Problem: 3643. Flip Square Submatrix Vertically
 * Difficulty: Easy
 * Language: Java
 * 
 * Approach:
 * The square submatrix starts at top-left corner (x, y) with side length k.
 * Its row boundaries are [x, x + k - 1] and column boundaries are [y, y + k - 1].
 * To flip this submatrix vertically, we use two row pointers: top = x and bottom = x + k - 1.
 * While top < bottom, we swap the elements across all k columns from y to y + k - 1.
 * Then increment top and decrement bottom, performing the flip in-place.
 * 
 * Time Complexity: O(k^2)
 * Space Complexity: O(1) auxiliary space (in-place modification)
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
