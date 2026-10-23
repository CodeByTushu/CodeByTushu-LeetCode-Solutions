/**
 * Problem: LeetCode 1914 - Cyclically Rotating a Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public int[][] rotateGrid(int[][] grid, int k) {
        int m = grid.length;
        int n = grid[0].length;
        int layers = Math.min(m, n) / 2;

        for (int l = 0; l < layers; l++) {
            int r1 = l, c1 = l;
            int r2 = m - 1 - l, c2 = n - 1 - l;

            // 1. Collect coordinates along counter-clockwise perimeter
            List<int[]> positions = new ArrayList<>();
            // Left column: top to bottom
            for (int r = r1; r <= r2; r++) positions.add(new int[]{r, c1});
            // Bottom row: left to right
            for (int c = c1 + 1; c <= c2; c++) positions.add(new int[]{r2, c});
            // Right column: bottom to top
            for (int r = r2 - 1; r >= r1; r--) positions.add(new int[]{r, c2});
            // Top row: right to left
            for (int c = c2 - 1; c >= c1 + 1; c--) positions.add(new int[]{r1, c});

            int L = positions.size();
            int[] vals = new int[L];
            for (int i = 0; i < L; i++) {
                int[] pos = positions.get(i);
                vals[i] = grid[pos[0]][pos[1]];
            }

            // 2. Rotate counter-clockwise by k % L
            int shift = k % L;
            for (int i = 0; i < L; i++) {
                int targetIdx = (i + shift) % L;
                int[] targetPos = positions.get(targetIdx);
                grid[targetPos[0]][targetPos[1]] = vals[i];
            }
        }

        return grid;
    }
}
