import java.util.*;

class Solution {
    private static final int MOD = 1_000_000_007;

    public int assignEdgeWeights(int[][] edges) {
        int n = edges.length + 1;

        List<Integer>[] graph = new ArrayList[n + 1];
        for (int i = 1; i <= n; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] e : edges) {
            graph[e[0]].add(e[1]);
            graph[e[1]].add(e[0]);
        }

        // Find maximum depth from root (node 1)
        int maxDepth = 0;
        boolean[] vis = new boolean[n + 1];

        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{1, 0});
        vis[1] = true;

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int node = cur[0];
            int depth = cur[1];

            maxDepth = Math.max(maxDepth, depth);

            for (int nxt : graph[node]) {
                if (!vis[nxt]) {
                    vis[nxt] = true;
                    q.offer(new int[]{nxt, depth + 1});
                }
            }
        }

        // Number of odd-sum assignments on a path of length maxDepth
        long ans = 1;
        for (int i = 1; i < maxDepth; i++) {
            ans = (ans * 2) % MOD;
        }

        return (int) ans;
    }
}
