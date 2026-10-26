/**
 * Problem: LeetCode 2977 - Minimum Cost to Convert String II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 * 
 * Floyd-Warshall Algorithm + Dynamic Programming
 * Time Complexity: O(V^3 + N * |lengths| * L_max)
 * Space Complexity: O(V^2 + N)
 */

import java.util.*;

class Solution {
    public long minimumCost(String source, String target, String[] original, String[] changed, int[] cost) {
        int n = source.length();
        Map<String, Integer> strToId = new HashMap<>();
        int idCounter = 0;

        // Assign integer IDs to unique strings
        for (int i = 0; i < original.length; i++) {
            if (!strToId.containsKey(original[i])) {
                strToId.put(original[i], idCounter++);
            }
            if (!strToId.containsKey(changed[i])) {
                strToId.put(changed[i], idCounter++);
            }
        }

        int V = idCounter;
        final long INF = 1_000_000_000_000_000L; // 10^15 safely avoids overflow
        long[][] dist = new long[V][V];
        for (int i = 0; i < V; i++) {
            Arrays.fill(dist[i], INF);
            dist[i][i] = 0;
        }

        // Initialize direct transition costs (taking min for duplicate rules)
        for (int i = 0; i < original.length; i++) {
            int u = strToId.get(original[i]);
            int v = strToId.get(changed[i]);
            dist[u][v] = Math.min(dist[u][v], (long) cost[i]);
        }

        // Floyd-Warshall algorithm to find all-pairs shortest paths among substrings
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                if (dist[i][k] >= INF) continue;
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        // Collect distinct substring lengths for fast DP transitions
        Set<Integer> distinctLengthsSet = new TreeSet<>();
        for (String s : original) {
            distinctLengthsSet.add(s.length());
        }
        List<Integer> lengths = new ArrayList<>(distinctLengthsSet);

        // dp[i] = minimum cost to convert source[0..i-1] to target[0..i-1]
        long[] dp = new long[n + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;

        for (int i = 1; i <= n; i++) {
            // Case 1: single character match (0 cost)
            if (source.charAt(i - 1) == target.charAt(i - 1) && dp[i - 1] < INF) {
                dp[i] = Math.min(dp[i], dp[i - 1]);
            }

            // Case 2: replace a valid substring of length L
            for (int L : lengths) {
                int j = i - L;
                if (j < 0) continue;
                if (dp[j] >= INF) continue;

                String subS = source.substring(j, i);
                String subT = target.substring(j, i);

                Integer u = strToId.get(subS);
                Integer v = strToId.get(subT);

                if (u != null && v != null && dist[u][v] < INF) {
                    dp[i] = Math.min(dp[i], dp[j] + dist[u][v]);
                }
            }
        }

        return dp[n] >= INF ? -1 : dp[n];
    }
}
