#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

using namespace std;

/**
 * Problem: LeetCode 3620 - Network Recovery Pathways
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
private:
    bool canReach(const vector<vector<pair<int, int>>>& graph, const vector<bool>& online, long long k, int limit, int n) {
        vector<long long> dist(n, LLONG_MAX);
        dist[0] = 0;

        vector<int> indegree(n, 0);

        for (int u = 0; u < n; u++) {
            if (u != 0 && u != n - 1 && !online[u]) continue;

            for (const auto& e : graph[u]) {
                int v = e.first;
                int w = e.second;
                if (v != 0 && v != n - 1 && !online[v]) continue;
                if (w < limit) continue;
                indegree[v]++;
            }
        }

        queue<int> q;
        for (int i = 0; i < n; i++) {
            if ((i == 0 || i == n - 1 || online[i]) && indegree[i] == 0) {
                q.push(i);
            }
        }

        while (!q.empty()) {
            int u = q.front();
            q.pop();

            for (const auto& e : graph[u]) {
                int v = e.first;
                int w = e.second;

                if (v != 0 && v != n - 1 && !online[v]) continue;
                if (w < limit) continue;

                if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }

                if (--indegree[v] == 0) {
                    q.push(v);
                }
            }
        }

        return dist[n - 1] <= k;
    }

public:
    int findMaxPathScore(vector<vector<int>>& edges, vector<bool>& online, long long k) {
        int n = online.size();

        vector<vector<pair<int, int>>> graph(n);
        int maxCost = 0;

        for (const auto& e : edges) {
            graph[e[0]].push_back({e[1], e[2]});
            maxCost = max(maxCost, e[2]);
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
};
