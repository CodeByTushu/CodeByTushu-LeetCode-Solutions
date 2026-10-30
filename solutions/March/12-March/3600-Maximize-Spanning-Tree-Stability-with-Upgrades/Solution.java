/**
 * Problem: LeetCode 3600 - Maximize Spanning Tree Stability with Upgrades
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    static class DSU {
        int[] parent;
        int[] rank;
        int components;

        DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
            components = n;
        }

        int find(int i) {
            int root = i;
            while (root != parent[root]) {
                root = parent[root];
            }
            int curr = i;
            while (curr != root) {
                int next = parent[curr];
                parent[curr] = root;
                curr = next;
            }
            return root;
        }

        boolean union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                if (rank[rootI] < rank[rootJ]) {
                    parent[rootI] = rootJ;
                } else if (rank[rootI] > rank[rootJ]) {
                    parent[rootJ] = rootI;
                } else {
                    parent[rootJ] = rootI;
                    rank[rootI]++;
                }
                components--;
                return true;
            }
            return false;
        }
    }

    public int maxStability(int n, int[][] edges, int k) {
        DSU mandatoryDsu = new DSU(n);
        int mandatoryCount = 0;
        int minMandatory = Integer.MAX_VALUE;

        // Validate mandatory edges
        for (int[] e : edges) {
            if (e[3] == 1) {
                if (!mandatoryDsu.union(e[0], e[1])) {
                    return -1; // Cycle in mandatory edges
                }
                mandatoryCount++;
                minMandatory = Math.min(minMandatory, e[2]);
            }
        }

        // Validate whole graph connectivity
        DSU totalDsu = new DSU(n);
        for (int[] e : edges) {
            totalDsu.union(e[0], e[1]);
        }
        if (totalDsu.components > 1) {
            return -1;
        }

        int low = 1;
        int high = mandatoryCount > 0 ? Math.min(200000, minMandatory) : 200000;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canFormTree(n, edges, k, mid)) {
                ans = mid;
                low = mid + 1; // Search for higher stability
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }

    private boolean canFormTree(int n, int[][] edges, int k, int target) {
        DSU dsu = new DSU(n);

        // 1. Mandatory edges must satisfy strength >= target
        for (int[] e : edges) {
            if (e[3] == 1) {
                if (e[2] < target) {
                    return false;
                }
                dsu.union(e[0], e[1]);
            }
        }

        // 2. Add cost 0 optional edges (strength >= target)
        for (int[] e : edges) {
            if (e[3] == 0 && e[2] >= target) {
                dsu.union(e[0], e[1]);
            }
        }

        // 3. Add cost 1 optional edges (strength < target and 2 * strength >= target)
        int upgradesUsed = 0;
        for (int[] e : edges) {
            if (e[3] == 0 && e[2] < target && 2 * e[2] >= target) {
                if (dsu.find(e[0]) != dsu.find(e[1])) {
                    if (upgradesUsed < k) {
                        dsu.union(e[0], e[1]);
                        upgradesUsed++;
                    }
                }
            }
        }

        return dsu.components == 1;
    }
}
