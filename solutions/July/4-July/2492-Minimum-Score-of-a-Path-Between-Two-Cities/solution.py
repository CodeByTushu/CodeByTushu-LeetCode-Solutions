"""
Problem: LeetCode 2492 - Minimum Score of a Path Between Two Cities
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from collections import deque
from typing import List


class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        graph = [[] for _ in range(n + 1)]
        for u, v, d in roads:
            graph[u].append((v, d))
            graph[v].append((u, d))

        vis = [False] * (n + 1)
        q = deque([1])
        vis[1] = True

        ans = float("inf")

        while q:
            u = q.popleft()
            for v, d in graph[u]:
                if d < ans:
                    ans = d
                if not vis[v]:
                    vis[v] = True
                    q.append(v)

        return ans
