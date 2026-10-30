/**
 * Problem: 1886. Determine Whether Matrix Can Be Obtained By Rotation
 * Difficulty: Easy
 * Language: Java
 * 
 * Approach:
 * A square matrix can be rotated clockwise in 90-degree increments by 0, 90, 180, or 270 degrees.
 * Instead of physically rotating the matrix multiple times, we can test all 4 possible orientations
 * in a single pass over the n x n matrix using coordinate transformations:
 * - 0 degrees:   mat[i][j] == target[i][j]
 * - 90 degrees:  mat[i][j] == target[j][n - 1 - i]
 * - 180 degrees: mat[i][j] == target[n - 1 - i][n - 1 - j]
 * - 270 degrees: mat[i][j] == target[n - 1 - j][i]
 * If any of the four orientation flags remains true after checking all cells, return true.
 * 
 * Time Complexity: O(n^2)
 * Space Complexity: O(1) auxiliary space
 */
class Solution {
    public boolean findRotation(int[][] mat, int[][] target) {
        int n = mat.length;
        boolean r0 = true, r90 = true, r180 = true, r270 = true;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] != target[i][j]) {
                    r0 = false;
                }
                if (mat[i][j] != target[j][n - 1 - i]) {
                    r90 = false;
                }
                if (mat[i][j] != target[n - 1 - i][n - 1 - j]) {
                    r180 = false;
                }
                if (mat[i][j] != target[n - 1 - j][i]) {
                    r270 = false;
                }
            }
        }

        return r0 || r90 || r180 || r270;
    }
}
