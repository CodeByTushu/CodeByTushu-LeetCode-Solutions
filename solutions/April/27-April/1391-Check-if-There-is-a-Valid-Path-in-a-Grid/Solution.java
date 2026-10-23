/**
 * Problem: LeetCode 1391 - Check if There is a Valid Path in a Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    static class DSU {
        int[] parent;

        public DSU(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }

        public int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]);
        }

        public void union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                parent[rootI] = rootJ;
            }
        }
    }

    public boolean hasValidPath(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        DSU dsu = new DSU(m * n);

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int val = grid[r][c];

                // Check right neighbor
                if (c + 1 < n) {
                    int rightVal = grid[r][c + 1];
                    boolean canGoRight = (val == 1 || val == 4 || val == 6);
                    boolean canReceiveLeft = (rightVal == 1 || rightVal == 3 || rightVal == 5);
                    if (canGoRight && canReceiveLeft) {
                        dsu.union(r * n + c, r * n + (c + 1));
                    }
                }

                // Check down neighbor
                if (r + 1 < m) {
                    int downVal = grid[r + 1][c];
                    boolean canGoDown = (val == 2 || val == 3 || val == 4);
                    boolean canReceiveUp = (downVal == 2 || downVal == 5 || downVal == 6);
                    if (canGoDown && canReceiveUp) {
                        dsu.union(r * n + c, (r + 1) * n + c);
                    }
                }
            }
        }

        return dsu.find(0) == dsu.find(m * n - 1);
    }
}
