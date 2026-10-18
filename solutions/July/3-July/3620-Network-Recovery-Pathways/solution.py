from collections import deque
from typing import List

class Solution:
    def findMaxPathScore(self, edges: List[List[int]], online: List[bool], k: int) -> int:
        n = len(online)
        graph = [[] for _ in range(n)]
        max_cost = 0

        for u, v, w in edges:
            graph[u].append((v, w))
            if w > max_cost:
                max_cost = w

        def can_reach(limit: int) -> bool:
            indegree = [0] * n

            for u in range(n):
                if u != 0 and u != n - 1 and not online[u]:
                    continue
                for v, w in graph[u]:
                    if v != 0 and v != n - 1 and not online[v]:
                        continue
                    if w < limit:
                        continue
                    indegree[v] += 1

            q = deque()
            for i in range(n):
                if (i == 0 or i == n - 1 or online[i]) and indegree[i] == 0:
                    q.append(i)

            dist = [float('inf')] * n
            dist[0] = 0

            while q:
                u = q.popleft()
                for v, w in graph[u]:
                    if v != 0 and v != n - 1 and not online[v]:
                        continue
                    if w < limit:
                        continue

                    if dist[u] != float('inf') and dist[u] + w < dist[v]:
                        dist[v] = dist[u] + w

                    indegree[v] -= 1
                    if indegree[v] == 0:
                        q.append(v)

            return dist[n - 1] <= k

        lo, hi = 0, max_cost
        ans = -1

        while lo <= hi:
            mid = lo + (hi - lo) // 2
            if can_reach(mid):
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1

        return ans
