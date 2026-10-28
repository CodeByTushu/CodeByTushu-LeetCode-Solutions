/**
 * Problem: LeetCode 3841 - Palindromic Path Queries in a Tree
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;

class Solution {
    vector<int> bit;
    int n;

    void upd(int i, int v) {
        for (; i <= n + 1; i += i & -i) bit[i] ^= v;
    }

    int qry(int i) {
        int r = 0;
        for (; i > 0; i -= i & -i) r ^= bit[i];
        return r;
    }

public:
    vector<bool> palindromePath(int n, vector<vector<int>>& edges, string s, vector<string>& queries) {
        this->n = n;
        bit.assign(n + 3, 0);

        // Flat adjacency list for optimal cache locality
        vector<int> head(n, -1), nxt(2 * (n - 1)), to(2 * (n - 1));
        int ec = 0;
        for (const auto& e : edges) {
            to[ec] = e[1]; nxt[ec] = head[e[0]]; head[e[0]] = ec++;
            to[ec] = e[0]; nxt[ec] = head[e[1]]; head[e[1]] = ec++;
        }

        const int LOG = 17;
        vector<vector<int>> up(LOG, vector<int>(n, 0));
        vector<int> depth(n, 0), tin(n, 0), tout(n, 0), base(n, 0);
        vector<int> parent(n, -1);
        vector<int> ptr = head;
        vector<int> st(n);
        int top = 0, timer = 0;

        // Iterative Euler Tour DFS (Zero StackOverflow risk)
        st[top++] = 0;
        parent[0] = -1;
        up[0][0] = 0;
        tin[0] = ++timer;
        base[0] = 1 << (s[0] - 'a');

        while (top > 0) {
            int u = st[top - 1];
            if (ptr[u] != -1) {
                int e = ptr[u];
                ptr[u] = nxt[e];
                int v = to[e];
                if (v == parent[u]) continue;
                parent[v] = u;
                depth[v] = depth[u] + 1;
                base[v] = base[u] ^ (1 << (s[v] - 'a'));
                up[0][v] = u;
                tin[v] = ++timer;
                st[top++] = v;
            } else {
                tout[u] = timer;
                top--;
            }
        }

        // Binary Lifting Table
        for (int k = 1; k < LOG; k++) {
            for (int v = 0; v < n; v++) {
                up[k][v] = up[k - 1][up[k - 1][v]];
            }
        }

        vector<bool> ans;
        ans.reserve(queries.size());

        for (const string& q : queries) {
            stringstream ss(q);
            string type;
            ss >> type;
            if (type == "update") {
                int u;
                char c;
                ss >> u >> c;
                if (s[u] == c) continue;
                int d = (1 << (s[u] - 'a')) ^ (1 << (c - 'a'));
                upd(tin[u], d);
                upd(tout[u] + 1, d);
                s[u] = c;
            } else {
                int u, v;
                ss >> u >> v;

                // Binary Lifting LCA
                int a = u, b = v;
                if (depth[a] < depth[b]) swap(a, b);
                int diff = depth[a] - depth[b];
                for (int k = 0; k < LOG; k++) {
                    if ((diff >> k) & 1) a = up[k][a];
                }

                int lca;
                if (a == b) {
                    lca = a;
                } else {
                    for (int k = LOG - 1; k >= 0; k--) {
                        if (up[k][a] != up[k][b]) {
                            a = up[k][a];
                            b = up[k][b];
                        }
                    }
                    lca = up[0][a];
                }

                int pu = base[u] ^ qry(tin[u]);
                int pv = base[v] ^ qry(tin[v]);
                int mask = pu ^ pv ^ (1 << (s[lca] - 'a'));

                ans.push_back((mask & (mask - 1)) == 0);
            }
        }

        return ans;
    }
};
