"""
Problem: LeetCode 1267 - Count Servers that Communicate
Difficulty: Medium
Language: Python (Python 3)
Author: CodeByTushu
"""
from typing import List

class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        row_count = [0] * m
        col_count = [0] * n

        # First pass: precompute server frequencies per row and column
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    row_count[i] += 1
                    col_count[j] += 1

        # Second pass: count servers with at least one communication partner
        result = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1 and (row_count[i] > 1 or col_count[j] > 1):
                    result += 1

        return result
