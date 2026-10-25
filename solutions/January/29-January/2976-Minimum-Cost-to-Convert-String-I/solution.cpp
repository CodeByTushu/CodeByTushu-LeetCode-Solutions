/**
 * Problem: LeetCode 2976 - Minimum Cost to Convert String I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 * 
 * Floyd-Warshall Algorithm for All-Pairs Shortest Paths
 * Time Complexity: O(|Σ|^3 + |E| + N) where |Σ| = 26, N = source.length()
 * Space Complexity: O(|Σ|^2) = O(1) auxiliary space
 */

#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    long long minimumCost(string source, string target, vector<char>& original, vector<char>& changed, vector<int>& cost) {
        const int NUM_CHARS = 26;
        const long long INF = 1e15;

        vector<vector<long long>> dist(NUM_CHARS, vector<long long>(NUM_CHARS, INF));
        for (int i = 0; i < NUM_CHARS; ++i) {
            dist[i][i] = 0;
        }

        // Build direct transitions taking minimum cost when multiple edges exist
        for (size_t i = 0; i < original.size(); ++i) {
            int u = original[i] - 'a';
            int v = changed[i] - 'a';
            dist[u][v] = min(dist[u][v], (long long)cost[i]);
        }

        // Floyd-Warshall Algorithm
        for (int k = 0; k < NUM_CHARS; ++k) {
            for (int i = 0; i < NUM_CHARS; ++i) {
                for (int j = 0; j < NUM_CHARS; ++j) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        long long totalCost = 0;
        int n = source.length();

        for (int i = 0; i < n; ++i) {
            int s = source[i] - 'a';
            int t = target[i] - 'a';

            if (s != t) {
                if (dist[s][t] >= INF) {
                    return -1; // Unreachable
                }
                totalCost += dist[s][t];
            }
        }

        return totalCost;
    }
};
