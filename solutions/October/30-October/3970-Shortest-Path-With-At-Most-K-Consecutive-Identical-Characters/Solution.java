import java.util.*;

/**
 * Problem: LeetCode 3970 - Shortest Path With At Most K Consecutive Identical Characters
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int shortestPath(int n, int[][] edges, String labels, int k) {
        // adjacency list (arrays)
        int m = edges.length;
        int[] head = new int[n], nxt = new int[m], to = new int[m], wt = new int[m];
        Arrays.fill(head, -1);
        for (int i = 0; i < m; i++) {
            int u = edges[i][0];
            to[i] = edges[i][1];
            wt[i] = edges[i][2];
            nxt[i] = head[u];
            head[u] = i;
        }

        char[] lab = labels.toCharArray();
        int INF = Integer.MAX_VALUE;

        // dist[u * (k + 1) + r], r in [1..k]
        int[] dist = new int[n * (k + 1)];
        Arrays.fill(dist, INF);

        // heap entry: (distance << 32) | stateIndex
        PriorityQueue<Long> pq = new PriorityQueue<>();
        int startState = 0 * (k + 1) + 1;
        dist[startState] = 0;
        pq.offer((long) 0 << 32 | startState);

        while (!pq.isEmpty()) {
            long top = pq.poll();
            int d = (int) (top >>> 32);
            int state = (int) (top & 0xFFFFFFFFL);

            if (d > dist[state]) continue;

            int u = state / (k + 1);
            int r = state % (k + 1);

            if (u == n - 1) return d; // first time we pop n-1 is the minimum

            for (int e = head[u]; e != -1; e = nxt[e]) {
                int v = to[e];
                int nr;
                if (lab[v] == lab[u]) {
                    nr = r + 1;
                    if (nr > k) continue;
                } else {
                    nr = 1;
                }

                int nd = d + wt[e];
                int ns = v * (k + 1) + nr;
                if (nd < dist[ns]) {
                    dist[ns] = nd;
                    pq.offer(((long) nd << 32) | ns);
                }
            }
        }

        return -1;
    }
}
