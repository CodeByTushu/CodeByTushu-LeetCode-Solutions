"""
Problem: LeetCode 3841 - Palindromic Path Queries in a Tree
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""

from typing import List

class Solution:
    def palindromePath(self, n: int, edges: List[List[int]], s: str, queries: List[str]) -> List[bool]:
        # Adjacency list
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        arr = list(s)
        LOG = 17
        up = [[0] * n for _ in range(LOG)]
        depth = [0] * n
        tin = [0] * n
        tout = [0] * n
        base = [0] * n

        # Iterative Euler Tour DFS (Zero StackOverflow risk)
        timer = 0
        parent = [-1] * n
        it = [0] * n
        order = [0]
        timer += 1
        tin[0] = timer
        base[0] = 1 << (ord(arr[0]) - ord('a'))

        while order:
            u = order[-1]
            if it[u] < len(adj[u]):
                v = adj[u][it[u]]
                it[u] += 1
                if v == parent[u]:
                    continue
                parent[v] = u
                depth[v] = depth[u] + 1
                base[v] = base[u] ^ (1 << (ord(arr[v]) - ord('a')))
                up[0][v] = u
                timer += 1
                tin[v] = timer
                order.append(v)
            else:
                tout[u] = timer
                order.pop()

        # Binary Lifting Table
        for k in range(1, LOG):
            for v in range(n):
                up[k][v] = up[k - 1][up[k - 1][v]]

        # Fenwick Tree for range XOR updates and point queries
        bit = [0] * (n + 3)

        def upd(i: int, v: int) -> None:
            while i <= n + 1:
                bit[i] ^= v
                i += i & (-i)

        def qry(i: int) -> int:
            r = 0
            while i > 0:
                r ^= bit[i]
                i -= i & (-i)
            return r

        ans = []
        for q in queries:
            parts = q.split()
            if parts[0] == "update":
                u = int(parts[1])
                c = parts[2]
                if arr[u] == c:
                    continue
                d = (1 << (ord(arr[u]) - ord('a'))) ^ (1 << (ord(c) - ord('a')))
                upd(tin[u], d)
                upd(tout[u] + 1, d)
                arr[u] = c
            else:
                u = int(parts[1])
                v = int(parts[2])

                # Binary Lifting LCA
                a, b = u, v
                if depth[a] < depth[b]:
                    a, b = b, a
                diff = depth[a] - depth[b]
                for k in range(LOG):
                    if (diff >> k) & 1:
                        a = up[k][a]

                if a == b:
                    lca = a
                else:
                    for k in range(LOG - 1, -1, -1):
                        if up[k][a] != up[k][b]:
                            a = up[k][a]
                            b = up[k][b]
                    lca = up[0][a]

                pu = base[u] ^ qry(tin[u])
                pv = base[v] ^ qry(tin[v])
                mask = pu ^ pv ^ (1 << (ord(arr[lca]) - ord('a')))

                ans.append((mask & (mask - 1)) == 0)

        return ans
