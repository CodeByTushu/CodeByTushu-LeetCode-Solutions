"""
Problem: LeetCode 3650 - Minimum Cost Path with Edge Reversals
Difficulty: Medium
Language: Python
Author: CodeByTushu

Augmented Graph + Dijkstra's Algorithm
Time Complexity: O((V + E) log V)
Space Complexity: O(V + E)
"""

from typing import List
import heapq

class Solution:
    def minCost(self, n: int, edges: List[List[int]]) -> int:
        graph = [[] for _ in range(n)]

        # Original directed edge u -> v with cost w
        # Reversed edge v -> u with cost 2 * w
        for u, v, w in edges:
            graph[u].append((v, w))
            graph[v].append((u, 2 * w))

        dist = [float('inf')] * n
        dist[0] = 0
        min_heap = [(0, 0)]  # (cost, node)

        while min_heap:
            current_cost, u = heapq.heappop(min_heap)

            if current_cost > dist[u]:
                continue

            if u == n - 1:
                return current_cost

            for v, weight in graph[u]:
                if dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight
                    heapq.heappush(min_heap, (dist[v], v))

        return -1 if dist[n - 1] == float('inf') else dist[n - 1]
