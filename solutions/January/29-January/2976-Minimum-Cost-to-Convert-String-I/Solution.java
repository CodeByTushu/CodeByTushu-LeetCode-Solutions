/**
 * Problem: LeetCode 2976 - Minimum Cost to Convert String I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 * 
 * Floyd-Warshall Algorithm for All-Pairs Shortest Paths
 * Time Complexity: O(|Σ|^3 + |E| + N) where |Σ| = 26, N = source.length()
 * Space Complexity: O(|Σ|^2) = O(1) auxiliary space
 */

import java.util.Arrays;

class Solution {
    public long minimumCost(String source, String target, char[] original, char[] changed, int[] cost) {
        final int NUM_CHARS = 26;
        final long INF = 1_000_000_000_000_000L; // 10^15 safely avoids overflow

        long[][] dist = new long[NUM_CHARS][NUM_CHARS];
        for (int i = 0; i < NUM_CHARS; i++) {
            Arrays.fill(dist[i], INF);
            dist[i][i] = 0;
        }

        // Build direct transition weights (taking minimum if duplicates exist)
        for (int i = 0; i < original.length; i++) {
            int u = original[i] - 'a';
            int v = changed[i] - 'a';
            dist[u][v] = Math.min(dist[u][v], (long) cost[i]);
        }

        // Floyd-Warshall to find all-pairs shortest paths among 26 letters
        for (int k = 0; k < NUM_CHARS; k++) {
            for (int i = 0; i < NUM_CHARS; i++) {
                for (int j = 0; j < NUM_CHARS; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        long totalCost = 0;
        int n = source.length();

        // Calculate minimum total transformation cost
        for (int i = 0; i < n; i++) {
            int s = source.charAt(i) - 'a';
            int t = target.charAt(i) - 'a';

            if (s != t) {
                if (dist[s][t] >= INF) {
                    return -1; // Impossible to convert
                }
                totalCost += dist[s][t];
            }
        }

        return totalCost;
    }
}
