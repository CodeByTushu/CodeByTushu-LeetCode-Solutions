"""
Problem: LeetCode 1559 - Detect Cycles in 2D Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i == root_j:
            return False  # Cycle detected

        if self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        elif self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        else:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1
        return True


class Solution:
    def containsCycle(self, grid: List[List[str]]) -> bool:
        m = len(grid)
        n = len(grid[0])
        dsu = DSU(m * n)

        for r in range(m):
            for c in range(n):
                u = r * n + c

                # Check right neighbor
                if c + 1 < n and grid[r][c] == grid[r][c + 1]:
                    v = r * n + (c + 1)
                    if not dsu.union(u, v):
                        return True

                # Check down neighbor
                if r + 1 < m and grid[r][c] == grid[r + 1][c]:
                    v = (r + 1) * n + c
                    if not dsu.union(u, v):
                        return True

        return False
