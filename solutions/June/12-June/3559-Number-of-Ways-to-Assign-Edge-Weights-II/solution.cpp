#include <vector>
#include <algorithm>

using namespace std;

class Solution {
    static const int MOD = 1000000007;
    static const int LOG = 17;

public:
    vector<int> assignEdgeWeights(vector<vector<int>>& edges, vector<vector<int>>& queries) {
        int n = edges.size() + 1;
        vector<vector<int>> graph(n + 1);
        for (const auto& e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }

        vector<vector<int>> up(n + 1, vector<int>(LOG + 1, 0));
        vector<int> depth(n + 1, 0);

        auto dfs = [&](auto& self, int node, int parent) -> void {
            up[node][0] = parent;
            for (int nxt : graph[node]) {
                if (nxt == parent) continue;
                depth[nxt] = depth[node] + 1;
                self(self, nxt, node);
            }
        };

        dfs(dfs, 1, 0);

        for (int j = 1; j <= LOG; j++) {
            for (int i = 1; i <= n; i++) {
                up[i][j] = up[up[i][j - 1]][j - 1];
            }
        }

        vector<long long> pow2(n + 1, 1);
        for (int i = 1; i <= n; i++) {
            pow2[i] = (pow2[i - 1] * 2) % MOD;
        }

        auto getLCA = [&](int u, int v) -> int {
            if (depth[u] < depth[v]) {
                swap(u, v);
            }

            int diff = depth[u] - depth[v];
            for (int j = LOG; j >= 0; j--) {
                if ((diff >> j) & 1) {
                    u = up[u][j];
                }
            }

            if (u == v) return u;

            for (int j = LOG; j >= 0; j--) {
                if (up[u][j] != up[v][j]) {
                    u = up[u][j];
                    v = up[v][j];
                }
            }

            return up[u][0];
        };

        int q = queries.size();
        vector<int> ans(q);
        for (int i = 0; i < q; i++) {
            int u = queries[i][0];
            int v = queries[i][1];
            int lca = getLCA(u, v);
            int len = depth[u] + depth[v] - 2 * depth[lca];

            if (len == 0) {
                ans[i] = 0;
            } else {
                ans[i] = pow2[len - 1];
            }
        }

        return ans;
    }
};
