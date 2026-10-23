"""
Problem: LeetCode 1391 - Check if There is a Valid Path in a Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))

    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i: int, j: int) -> None:
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            self.parent[root_i] = root_j


class Solution:
    def hasValidPath(self, grid: List[List[int]]) -> bool:
        m = len(grid)
        n = len(grid[0])
        dsu = DSU(m * n)

        for r in range(m):
            for c in range(n):
                val = grid[r][c]

                # Check right neighbor
                if c + 1 < n:
                    right_val = grid[r][c + 1]
                    can_go_right = val in (1, 4, 6)
                    can_receive_left = right_val in (1, 3, 5)
                    if can_go_right and can_receive_left:
                        dsu.union(r * n + c, r * n + (c + 1))

                # Check down neighbor
                if r + 1 < m:
                    down_val = grid[r + 1][c]
                    can_go_down = val in (2, 3, 4)
                    can_receive_up = down_val in (2, 5, 6)
                    if can_go_down and can_receive_up:
                        dsu.union(r * n + c, (r + 1) * n + c)

        return dsu.find(0) == dsu.find(m * n - 1)
