"""
Problem: LeetCode 3970 - Shortest Path With At Most K Consecutive Identical Characters
Difficulty: Medium
Language: Python (Python 3)
Author: CodeByTushu
"""

import heapq
from typing import List

class Solution:
    def shortestPath(self, n: int, edges: List[List[int]], labels: str, k: int) -> int:
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))

        INF = float('inf')
        dist = [INF] * (n * (k + 1))

        start_state = 0 * (k + 1) + 1
        dist[start_state] = 0
        pq = [(0, start_state)]

        while pq:
            d, state = heapq.heappop(pq)
            if d > dist[state]:
                continue

            u = state // (k + 1)
            r = state % (k + 1)

            if u == n - 1:
                return d

            for v, w in adj[u]:
                if labels[v] == labels[u]:
                    nr = r + 1
                    if nr > k:
                        continue
                else:
                    nr = 1

                nd = d + w
                ns = v * (k + 1) + nr
                if nd < dist[ns]:
                    dist[ns] = nd
                    heapq.heappush(pq, (nd, ns))

        return -1
