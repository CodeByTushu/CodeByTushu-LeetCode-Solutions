import java.util.*;

/**
 * Problem: LeetCode 2685 - Count the Number of Complete Components
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {

    public int countCompleteComponents(int n, int[][] edges) {

        List<Integer>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            graph[edge[0]].add(edge[1]);
            graph[edge[1]].add(edge[0]);
        }

        boolean[] visited = new boolean[n];
        int complete = 0;

        for (int i = 0; i < n; i++) {

            if (visited[i]) continue;

            Queue<Integer> queue = new LinkedList<>();
            List<Integer> component = new ArrayList<>();

            queue.offer(i);
            visited[i] = true;

            while (!queue.isEmpty()) {

                int node = queue.poll();
                component.add(node);

                for (int next : graph[node]) {
                    if (!visited[next]) {
                        visited[next] = true;
                        queue.offer(next);
                    }
                }
            }

            int size = component.size();
            boolean ok = true;

            for (int node : component) {
                if (graph[node].size() != size - 1) {
                    ok = false;
                    break;
                }
            }

            if (ok) complete++;
        }

        return complete;
    }
}
