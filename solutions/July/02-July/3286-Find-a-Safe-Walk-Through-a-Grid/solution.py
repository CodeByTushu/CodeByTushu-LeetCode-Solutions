"""
Problem: LeetCode 3286 - Find a Safe Walk Through a Grid
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

import heapq
from typing import List

class Solution:
    def findSafeWalk(self, grid: List[List[int]], health: int) -> bool:
        m, n = len(grid), len(grid[0])
        best = [[-1] * n for _ in range(m)]

        start_health = health - grid[0][0]
        if start_health <= 0:
            return False

        best[0][0] = start_health
        # Max-heap storing (-health, x, y)
        pq = [(-start_health, 0, 0)]

        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        while pq:
            neg_h, x, y = heapq.heappop(pq)
            h = -neg_h

            if h != best[x][y]:
                continue

            if x == m - 1 and y == n - 1:
                return True

            for dx, dy in dirs:
                nx, ny = x + dx, y + dy
                if 0 <= nx < m and 0 <= ny < n:
                    nh = h - grid[nx][ny]
                    if nh > 0 and nh > best[nx][ny]:
                        best[nx][ny] = nh
                        heapq.heappush(pq, (-nh, nx, ny))

        return False
