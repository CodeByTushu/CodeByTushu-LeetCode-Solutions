import java.util.*;

/**
 * Problem: LeetCode 3620 - Network Recovery Pathways
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int findMaxPathScore(int[][] edges, boolean[] online, long k) {
        int n = online.length;

        List<int[]>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();

        int maxCost = 0;
        for (int[] e : edges) {
            graph[e[0]].add(new int[]{e[1], e[2]});
            maxCost = Math.max(maxCost, e[2]);
        }

        int lo = 0, hi = maxCost, ans = -1;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (canReach(graph, online, k, mid, n)) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return ans;
    }

    private boolean canReach(List<int[]>[] graph, boolean[] online, long k, int limit, int n) {
        long[] dist = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[0] = 0;

        int[] indegree = new int[n];

        for (int u = 0; u < n; u++) {
            if (u != 0 && u != n - 1 && !online[u]) continue;

            for (int[] e : graph[u]) {
                int v = e[0];
                if (v != 0 && v != n - 1 && !online[v]) continue;
                if (e[1] < limit) continue;
                indegree[v]++;
            }
        }

        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            if ((i == 0 || i == n - 1 || online[i]) && indegree[i] == 0) {
                q.offer(i);
            }
        }

        while (!q.isEmpty()) {
            int u = q.poll();

            for (int[] e : graph[u]) {
                int v = e[0];
                int w = e[1];

                if (v != 0 && v != n - 1 && !online[v]) continue;
                if (w < limit) continue;

                if (dist[u] != Long.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }

                if (--indegree[v] == 0) {
                    q.offer(v);
                }
            }
        }

        return dist[n - 1] <= k;
    }
}
