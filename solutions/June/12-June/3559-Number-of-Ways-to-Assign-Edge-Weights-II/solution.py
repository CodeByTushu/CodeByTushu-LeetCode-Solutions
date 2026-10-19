from typing import List

class Solution:
    def assignEdgeWeights(self, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        MOD = 1_000_000_007
        LOG = 17
        n = len(edges) + 1

        graph = [[] for _ in range(n + 1)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        up = [[0] * (LOG + 1) for _ in range(n + 1)]
        depth = [0] * (n + 1)

        # Iterative BFS to prevent recursion depth exceeded on deep trees
        queue = [1]
        visited = [False] * (n + 1)
        visited[1] = True
        head = 0

        while head < len(queue):
            node = queue[head]
            head += 1
            for nxt in graph[node]:
                if not visited[nxt]:
                    visited[nxt] = True
                    depth[nxt] = depth[node] + 1
                    up[nxt][0] = node
                    queue.append(nxt)

        for j in range(1, LOG + 1):
            for i in range(1, n + 1):
                up[i][j] = up[up[i][j - 1]][j - 1]

        pow2 = [1] * (n + 1)
        for i in range(1, n + 1):
            pow2[i] = (pow2[i - 1] * 2) % MOD

        def get_lca(u: int, v: int) -> int:
            if depth[u] < depth[v]:
                u, v = v, u

            diff = depth[u] - depth[v]
            for j in range(LOG, -1, -1):
                if (diff >> j) & 1:
                    u = up[u][j]

            if u == v:
                return u

            for j in range(LOG, -1, -1):
                if up[u][j] != up[v][j]:
                    u = up[u][j]
                    v = up[v][j]

            return up[u][0]

        ans = []
        for u, v in queries:
            lca = get_lca(u, v)
            length = depth[u] + depth[v] - 2 * depth[lca]

            if length == 0:
                ans.append(0)
            else:
                ans.append(pow2[length - 1])

        return ans
