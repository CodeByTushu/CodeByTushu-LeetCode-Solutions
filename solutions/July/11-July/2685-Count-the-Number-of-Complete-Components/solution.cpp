#include <vector>
#include <queue>

using namespace std;

/**
 * Problem: LeetCode 2685 - Count the Number of Complete Components
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int countCompleteComponents(int n, vector<vector<int>>& edges) {
        vector<vector<int>> graph(n);
        for (const auto& edge : edges) {
            graph[edge[0]].push_back(edge[1]);
            graph[edge[1]].push_back(edge[0]);
        }

        vector<bool> visited(n, false);
        int complete = 0;

        for (int i = 0; i < n; i++) {
            if (visited[i]) continue;

            queue<int> q;
            vector<int> component;

            q.push(i);
            visited[i] = true;

            while (!q.empty()) {
                int node = q.front();
                q.pop();
                component.push_back(node);

                for (int next : graph[node]) {
                    if (!visited[next]) {
                        visited[next] = true;
                        q.push(next);
                    }
                }
            }

            int size = component.size();
            boolean ok = true;

            for (int node : component) {
                if ((int)graph[node].size() != size - 1) {
                    ok = false;
                    break;
                }
            }

            if (ok) complete++;
        }

        return complete;
    }
};
