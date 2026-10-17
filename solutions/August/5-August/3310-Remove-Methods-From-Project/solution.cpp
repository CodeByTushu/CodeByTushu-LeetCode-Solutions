#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    vector<int> remainingMethods(int n, int k, vector<vector<int>>& invocations) {
        vector<vector<int>> graph(n);
        for (const auto& inv : invocations) {
            graph[inv[0]].push_back(inv[1]);
        }

        vector<bool> suspicious(n, false);
        queue<int> q;
        q.push(k);
        suspicious[k] = true;

        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            for (int next : graph[curr]) {
                if (!suspicious[next]) {
                    suspicious[next] = true;
                    q.push(next);
                }
            }
        }

        for (const auto& inv : invocations) {
            int u = inv[0], v = inv[1];
            if (!suspicious[u] && suspicious[v]) {
                vector<int> all(n);
                for (int i = 0; i < n; i++) all[i] = i;
                return all;
            }
        }

        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (!suspicious[i]) {
                result.push_back(i);
            }
        }

        return result;
    }
};
