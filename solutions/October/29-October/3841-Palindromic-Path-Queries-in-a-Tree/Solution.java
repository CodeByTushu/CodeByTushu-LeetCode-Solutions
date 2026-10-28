import java.util.*;

/**
 * Problem: LeetCode 3841 - Palindromic Path Queries in a Tree
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    int[] bit;
    int n;

    private void upd(int i, int v) {
        for (; i <= n + 1; i += i & -i) bit[i] ^= v;
    }

    private int qry(int i) {
        int r = 0;
        for (; i > 0; i -= i & -i) r ^= bit[i];
        return r;
    }

    public List<Boolean> palindromePath(int n, int[][] edges, String s, String[] queries) {
        this.n = n;
        bit = new int[n + 3];

        // Flat adjacency list for optimal cache locality
        int[] head = new int[n], nxt = new int[2 * (n - 1)], to = new int[2 * (n - 1)];
        Arrays.fill(head, -1);
        int ec = 0;
        for (int[] e : edges) {
            to[ec] = e[1]; nxt[ec] = head[e[0]]; head[e[0]] = ec++;
            to[ec] = e[0]; nxt[ec] = head[e[1]]; head[e[1]] = ec++;
        }

        char[] arr = s.toCharArray();
        int LOG = 17;
        int[][] up = new int[LOG][n];
        int[] depth = new int[n], tin = new int[n], tout = new int[n], base = new int[n];
        int[] parent = new int[n];
        int[] ptr = head.clone();
        int[] stack = new int[n];
        int top = 0, timer = 0;

        // Iterative Euler Tour DFS (Zero StackOverflow risk)
        stack[top++] = 0;
        parent[0] = -1;
        up[0][0] = 0;
        tin[0] = ++timer;
        base[0] = 1 << (arr[0] - 'a');

        while (top > 0) {
            int u = stack[top - 1];
            if (ptr[u] != -1) {
                int e = ptr[u];
                ptr[u] = nxt[e];
                int v = to[e];
                if (v == parent[u]) continue;
                parent[v] = u;
                depth[v] = depth[u] + 1;
                base[v] = base[u] ^ (1 << (arr[v] - 'a'));
                up[0][v] = u;
                tin[v] = ++timer;
                stack[top++] = v;
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

        List<Boolean> ans = new ArrayList<>(queries.length);

        for (String q : queries) {
            String[] parts = q.split(" ");
            if (parts[0].equals("update")) {
                int u = Integer.parseInt(parts[1]);
                char c = parts[2].charAt(0);
                if (arr[u] == c) continue;
                int d = (1 << (arr[u] - 'a')) ^ (1 << (c - 'a'));
                upd(tin[u], d);
                upd(tout[u] + 1, d);
                arr[u] = c;
            } else {
                int u = Integer.parseInt(parts[1]);
                int v = Integer.parseInt(parts[2]);

                // Binary Lifting LCA
                int a = u, b = v;
                if (depth[a] < depth[b]) { int t = a; a = b; b = t; }
                int diff = depth[a] - depth[b];
                for (int k = 0; k < LOG; k++) {
                    if (((diff >> k) & 1) == 1) a = up[k][a];
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
                int mask = pu ^ pv ^ (1 << (arr[lca] - 'a'));

                ans.add((mask & (mask - 1)) == 0);
            }
        }

        return ans;
    }
}
