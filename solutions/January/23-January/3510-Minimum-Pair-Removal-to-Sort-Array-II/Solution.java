/**
 * Problem: LeetCode 3510 - Minimum Pair Removal to Sort Array II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 * 
 * Optimized Doubly Linked List + PriorityQueue (Min-Heap) Approach
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

import java.util.PriorityQueue;

class Solution {
    // Helper class to store candidate adjacent pair in PriorityQueue
    private static class Pair implements Comparable<Pair> {
        long sum;
        int id;
        int ver;

        Pair(long sum, int id, int ver) {
            this.sum = sum;
            this.id = id;
            this.ver = ver;
        }

        @Override
        public int compareTo(Pair other) {
            if (this.sum != other.sum) {
                return Long.compare(this.sum, other.sum);
            }
            return Integer.compare(this.id, other.id);
        }
    }

    public int minimumPairRemoval(int[] nums) {
        int n = nums.length;
        if (n <= 1) return 0;

        long[] val = new long[n];
        int[] prev = new int[n];
        int[] next = new int[n];
        boolean[] deleted = new boolean[n];
        int[] version = new int[n];

        for (int i = 0; i < n; i++) {
            val[i] = nums[i];
            prev[i] = i - 1;
            next[i] = (i + 1 < n) ? i + 1 : -1;
        }

        int descents = 0;
        for (int i = 0; i < n - 1; i++) {
            if (val[i] > val[i + 1]) {
                descents++;
            }
        }

        if (descents == 0) return 0;

        PriorityQueue<Pair> pq = new PriorityQueue<>();
        for (int i = 0; i < n - 1; i++) {
            pq.offer(new Pair(val[i] + val[i + 1], i, 0));
        }

        int ops = 0;
        while (descents > 0 && !pq.isEmpty()) {
            Pair top = pq.poll();
            int u = top.id;

            if (deleted[u] || top.ver != version[u]) continue;
            int v = next[u];
            if (v == -1 || deleted[v]) continue;
            if (top.sum != val[u] + val[v]) continue;

            int p = prev[u];
            int w = next[v];

            // Remove previous inversion contributions
            if (p != -1 && val[p] > val[u]) descents--;
            if (val[u] > val[v]) descents--;
            if (w != -1 && val[v] > val[w]) descents--;

            // Merge u and v
            val[u] += val[v];
            deleted[v] = true;
            next[u] = w;
            if (w != -1) {
                prev[w] = u;
            }

            // Add new inversion contributions
            if (p != -1 && val[p] > val[u]) descents++;
            if (w != -1 && val[u] > val[w]) descents++;

            version[u]++;
            ops++;

            if (descents == 0) break;

            // Re-push updated adjacent pairs into PriorityQueue
            if (p != -1) {
                version[p]++;
                pq.offer(new Pair(val[p] + val[u], p, version[p]));
            }
            if (w != -1) {
                pq.offer(new Pair(val[u] + val[w], u, version[u]));
            }
        }

        return ops;
    }
}
