/**
 * Problem: LeetCode 1559 - Detect Cycles in 2D Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    static class DSU {
        int[] parent;
        int[] rank;

        public DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]);
        }

        public boolean union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI == rootJ) return false; // Cycle detected

            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true;
        }
    }

    public boolean containsCycle(char[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        DSU dsu = new DSU(m * n);

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int u = r * n + c;

                // Check right neighbor
                if (c + 1 < n && grid[r][c] == grid[r][c + 1]) {
                    int v = r * n + (c + 1);
                    if (!dsu.union(u, v)) {
                        return true;
                    }
                }

                // Check down neighbor
                if (r + 1 < m && grid[r][c] == grid[r + 1][c]) {
                    int v = (r + 1) * n + c;
                    if (!dsu.union(u, v)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
