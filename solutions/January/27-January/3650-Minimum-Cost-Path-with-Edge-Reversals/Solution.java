/**
 * Problem: LeetCode 3650 - Minimum Cost Path with Edge Reversals
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 * 
 * Augmented Graph + Dijkstra's Algorithm
 * Time Complexity: O((V + E) log V)
 * Space Complexity: O(V + E)
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

class Solution {
    public int minCost(int n, int[][] edges) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        // Build augmented graph:
        // Original edge u -> v with cost w
        // Reversed edge v -> u with cost 2 * w (representing switch at v)
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            graph.get(u).add(new int[]{v, w});
            graph.get(v).add(new int[]{u, 2 * w});
        }

        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[0] = 0;

        // Min-PriorityQueue storing {cost, node}
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, 0});

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0];
            int u = curr[1];

            if (d > dist[u]) {
                continue;
            }

            if (u == n - 1) {
                return d;
            }

            for (int[] next : graph.get(u)) {
                int v = next[0];
                int weight = next[1];
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }

        return dist[n - 1] == Integer.MAX_VALUE ? -1 : dist[n - 1];
    }
}
