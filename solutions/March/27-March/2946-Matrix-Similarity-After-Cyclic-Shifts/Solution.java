/**
 * Problem: 2946. Matrix Similarity After Cyclic Shifts
 * Difficulty: Easy
 * Language: Java
 * 
 * Approach:
 * A row is cyclically shifted by k positions.
 * - Even-indexed rows are shifted left by k steps.
 * - Odd-indexed rows are shifted right by k steps.
 * 
 * Key Invariant:
 * Cyclically shifting an array of length n by k positions leaves the array identical
 * to its original state if and only if every element mat[i][j] matches the element at its
 * shifted position.
 * 
 * Specifically:
 * - For left shift by k: mat[i][j] == mat[i][(j + k) % n]
 * - For right shift by k: mat[i][j] == mat[i][(j - k % n + n) % n]
 * 
 * Notice that an array is invariant under a cyclic left shift by k if and only if it is
 * invariant under a cyclic right shift by k. Both require mat[i][j] == mat[i][(j + k) % n].
 * Thus, we can simply verify for every cell (i, j) whether mat[i][j] == mat[i][(j + k) % n].
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(1) auxiliary space
 */

class Solution {
    public boolean areSimilar(int[][] mat, int k) {
        int m = mat.length;
        int n = mat[0].length;
        k %= n;

        if (k == 0) {
            return true;
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] != mat[i][(j + k) % n]) {
                    return false;
                }
            }
        }

        return true;
    }
}
