/**
 * Problem: LeetCode 1722 - Minimize Hamming Distance After Swap Operations
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.HashMap;
import java.util.Map;

class Solution {
    static class DSU {
        int[] parent;
        int[] rank;
        
        public DSU(int n) {
            parent = new int[n];
            rank = new int[n];
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
                if (rank[rootI] < rank[rootJ]) {
                    parent[rootI] = rootJ;
                } else if (rank[rootI] > rank[rootJ]) {
                    parent[rootJ] = rootI;
                } else {
                    parent[rootJ] = rootI;
                    rank[rootI]++;
                }
            }
        }
    }

    public int minimumHammingDistance(int[] source, int[] target, int[][] allowedSwaps) {
        final int n = source.length;
        DSU dsu = new DSU(n);
        
        for (int[] swapOp : allowedSwaps) {
            dsu.union(swapOp[0], swapOp[1]);
        }
        
        // Group frequencies of source elements by their connected component root
        Map<Integer, Map<Integer, Integer>> componentCounts = new HashMap<>();
        for (int i = 0; i < n; ++i) {
            int root = dsu.find(i);
            componentCounts.computeIfAbsent(root, k -> new HashMap<>())
                           .merge(source[i], 1, Integer::sum);
        }
        
        // Count positions where target[i] cannot be matched from the component
        int hammingDistance = 0;
        for (int i = 0; i < n; ++i) {
            int root = dsu.find(i);
            Map<Integer, Integer> counts = componentCounts.get(root);
            int val = target[i];
            int available = counts.getOrDefault(val, 0);
            
            if (available > 0) {
                counts.put(val, available - 1);
            } else {
                hammingDistance++;
            }
        }
        
        return hammingDistance;
    }
}
