/**
 * Problem: LeetCode 3970 - Shortest Path With At Most K Consecutive Identical Characters
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <queue>
#include <string>
#include <cstdint>

using namespace std;

class Solution {
public:
    int shortestPath(int n, vector<vector<int>>& edges, string labels, int k) {
        int m = edges.size();
        vector<int> head(n, -1), nxt(m), to(m), wt(m);
        for (int i = 0; i < m; i++) {
            int u = edges[i][0];
            to[i] = edges[i][1];
            wt[i] = edges[i][2];
            nxt[i] = head[u];
            head[u] = i;
        }

        const int INF = 1e9;
        vector<int> dist(n * (k + 1), INF);

        priority_queue<uint64_t, vector<uint64_t>, greater<uint64_t>> pq;
        int startState = 0 * (k + 1) + 1;
        dist[startState] = 0;
        pq.push(((uint64_t)0 << 32) | startState);

        while (!pq.empty()) {
            uint64_t top = pq.top();
            pq.pop();

            int d = (int)(top >> 32);
            int state = (int)(top & 0xFFFFFFFFULL);

            if (d > dist[state]) continue;

            int u = state / (k + 1);
            int r = state % (k + 1);

            if (u == n - 1) return d;

            for (int e = head[u]; e != -1; e = nxt[e]) {
                int v = to[e];
                int nr = (labels[v] == labels[u]) ? (r + 1) : 1;
                if (nr > k) continue;

                int nd = d + wt[e];
                int ns = v * (k + 1) + nr;
                if (nd < dist[ns]) {
                    dist[ns] = nd;
                    pq.push(((uint64_t)nd << 32) | ns);
                }
            }
        }

        return -1;
    }
};
