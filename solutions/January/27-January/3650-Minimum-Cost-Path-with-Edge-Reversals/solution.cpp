/**
 * Problem: LeetCode 3650 - Minimum Cost Path with Edge Reversals
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 * 
 * Augmented Graph + Dijkstra's Algorithm
 * Time Complexity: O((V + E) log V)
 * Space Complexity: O(V + E)
 */

#include <vector>
#include <queue>
#include <climits>

using namespace std;

class Solution {
public:
    int minCost(int n, vector<vector<int>>& edges) {
        vector<vector<pair<int, int>>> graph(n);

        // Original directed edge u -> v with cost w
        // Reversed edge v -> u with cost 2 * w
        for (const auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            graph[u].push_back({v, w});
            graph[v].push_back({u, 2 * w});
        }

        vector<int> dist(n, INT_MAX);
        dist[0] = 0;

        // Min-PriorityQueue: pair<cost, node>
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        pq.push({0, 0});

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            if (d > dist[u]) {
                continue;
            }

            if (u == n - 1) {
                return d;
            }

            for (const auto& [v, weight] : graph[u]) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.push({dist[v], v});
                }
            }
        }

        return dist[n - 1] == INT_MAX ? -1 : dist[n - 1];
    }
};
