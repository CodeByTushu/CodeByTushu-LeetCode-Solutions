#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

class Solution {
private:
    static const int MOD = 1000000007;

public:
    int assignEdgeWeights(vector<vector<int>>& edges) {
        int n = edges.size() + 1;

        vector<vector<int>> graph(n + 1);
        for (const auto& e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }

        // Find maximum depth from root (node 1)
        int maxDepth = 0;
        vector<bool> vis(n + 1, false);

        queue<pair<int, int>> q;
        q.push({1, 0});
        vis[1] = true;

        while (!q.empty()) {
            auto [node, depth] = q.front();
            q.pop();

            maxDepth = max(maxDepth, depth);

            for (int nxt : graph[node]) {
                if (!vis[nxt]) {
                    vis[nxt] = true;
                    q.push({nxt, depth + 1});
                }
            }
        }

        // Number of odd-sum assignments on a path of length maxDepth
        long long ans = 1;
        for (int i = 1; i < maxDepth; i++) {
            ans = (ans * 2) % MOD;
        }

        return static_cast<int>(ans);
    }
};
