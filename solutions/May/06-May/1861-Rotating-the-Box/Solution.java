/**
 * Problem: LeetCode 1861 - Rotating the Box
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public char[][] rotateTheBox(char[][] boxGrid) {
        int m = boxGrid.length;
        int n = boxGrid[0].length;

        // Step 1: Simulate gravity row by row (falling to the right)
        for (int i = 0; i < m; i++) {
            int emptySlot = n - 1;
            for (int j = n - 1; j >= 0; j--) {
                if (boxGrid[i][j] == '*') {
                    emptySlot = j - 1;
                } else if (boxGrid[i][j] == '#') {
                    boxGrid[i][j] = '.';
                    boxGrid[i][emptySlot] = '#';
                    emptySlot--;
                }
            }
        }

        // Step 2: Rotate the grid 90 degrees clockwise into an n x m matrix
        char[][] res = new char[n][m];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                res[j][m - 1 - i] = boxGrid[i][j];
            }
        }

        return res;
    }
}
