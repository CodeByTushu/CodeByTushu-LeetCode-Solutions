from collections import deque
from typing import List


class Solution:
    def assignEdgeWeights(self, edges: List[List[int]]) -> int:
        MOD = 1_000_000_007
        n = len(edges) + 1

        graph = [[] for _ in range(n + 1)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        # Find maximum depth from root (node 1)
        max_depth = 0
        vis = [False] * (n + 1)
        vis[1] = True

        q = deque([(1, 0)])

        while q:
            node, depth = q.popleft()
            max_depth = max(max_depth, depth)

            for nxt in graph[node]:
                if not vis[nxt]:
                    vis[nxt] = True
                    q.append((nxt, depth + 1))

        # Number of odd-sum assignments on a path of length maxDepth
        # Equal to 2^(max_depth - 1) % MOD
        ans = 1
        for _ in range(1, max_depth):
            ans = (ans * 2) % MOD

        return ans
