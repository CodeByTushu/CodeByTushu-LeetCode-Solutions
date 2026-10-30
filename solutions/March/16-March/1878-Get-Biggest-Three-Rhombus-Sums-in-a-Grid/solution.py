"""
Problem: LeetCode 1878 - Get Biggest Three Rhombus Sums in a Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def getBiggestThree(self, grid: List[List[int]]) -> List[int]:
        m = len(grid)
        n = len(grid[0])
        sums = set()

        for r in range(m):
            for c in range(n):
                # Area 0 rhombus
                sums.add(grid[r][c])

                # Area > 0 rhombuses with radius L
                L = 1
                while r - L >= 0 and r + L < m and c - L >= 0 and c + L < n:
                    total = 0
                    for i in range(L):
                        total += grid[r - L + i][c + i]  # top to right
                        total += grid[r + i][c + L - i]  # right to bottom
                        total += grid[r + L - i][c - i]  # bottom to left
                        total += grid[r - i][c - L + i]  # left to top
                    sums.add(total)
                    L += 1

        return sorted(sums, reverse=True)[:3]
