/**
 * Problem: LeetCode 2033 - Minimum Operations to Make a Uni-Value Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int minOperations(int[][] grid, int x) {
        int m = grid.length;
        int n = grid[0].length;
        int[] vals = new int[m * n];
        int idx = 0;
        int rem = grid[0][0] % x;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] % x != rem) {
                    return -1;
                }
                vals[idx++] = grid[i][j];
            }
        }

        Arrays.sort(vals);
        int median = vals[vals.length / 2];
        int operations = 0;

        for (int val : vals) {
            operations += Math.abs(val - median) / x;
        }

        return operations;
    }
}
