/**
 * Problem: LeetCode 1878 - Get Biggest Three Rhombus Sums in a Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.TreeSet;

class Solution {
    public int[] getBiggestThree(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        TreeSet<Integer> set = new TreeSet<>();

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                // Area 0 rhombus (single cell)
                set.add(grid[r][c]);

                // Area > 0 rhombuses with radius L
                for (int L = 1; r - L >= 0 && r + L < m && c - L >= 0 && c + L < n; L++) {
                    int sum = 0;
                    for (int i = 0; i < L; i++) {
                        sum += grid[r - L + i][c + i];     // top to right
                        sum += grid[r + i][c + L - i];     // right to bottom
                        sum += grid[r + L - i][c - i];     // bottom to left
                        sum += grid[r - i][c - L + i];     // left to top
                    }
                    set.add(sum);
                }
            }
        }

        int count = Math.min(3, set.size());
        int[] result = new int[count];
        for (int i = 0; i < count; i++) {
            result[i] = set.pollLast();
        }
        return result;
    }
}
