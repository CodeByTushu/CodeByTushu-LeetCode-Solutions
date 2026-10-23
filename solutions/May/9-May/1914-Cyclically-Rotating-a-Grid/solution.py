"""
Problem: LeetCode 1914 - Cyclically Rotating a Grid
Difficulty: Medium
Language: Python (3.x)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def rotateGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        layers = min(m, n) // 2

        for l in range(layers):
            r1, c1 = l, l
            r2, c2 = m - 1 - l, n - 1 - l

            # Collect coordinates along counter-clockwise perimeter
            positions = []
            # 1. Left col: top to bottom
            for r in range(r1, r2 + 1):
                positions.append((r, c1))
            # 2. Bottom row: left to right
            for c in range(c1 + 1, c2 + 1):
                positions.append((r2, c))
            # 3. Right col: bottom to top
            for r in range(r2 - 1, r1 - 1, -1):
                positions.append((r, c2))
            # 4. Top row: right to left
            for c in range(c2 - 1, c1, -1):
                positions.append((r1, c))

            L = len(positions)
            vals = [grid[r][c] for r, c in positions]
            shift = k % L

            # Write rotated values back into grid
            for i in range(L):
                tr, tc = positions[(i + shift) % L]
                grid[tr][tc] = vals[i]

        return grid
